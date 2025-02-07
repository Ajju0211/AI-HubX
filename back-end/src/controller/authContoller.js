import { User } from "../models/userModel.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetcookie } from "../utils/generateTokenAndSetcookie.js";
import { sendVerificationEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendResetSuccessEmail
 } from "../mailtrap/email.js";



import { chatModel } from "../models/chatModel.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received Data:", { email, password });

  try {
    if(!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Decrypt the email and password

    // Search user by decrypted email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    // Compare the decrypted password with the user's stored password
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token and set cookie (your custom function)
    generateTokenAndSetcookie(res, user._id);

    // Update last login date and save
    user.lastLogoin = new Date();
    await user.save();

    // Return response
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined, // Do not send password in the response
      },
    });
  } catch (error) {
    console.error("Error logging in:", error.message);
    return res.status(500).json({
      success: false,
      message: `Error logging in: ${error.message}`,
    });
  }
};


export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      if(userAlreadyExists.isVerified) {
        return res.status(400).json({ message: "User already exists" });
      }
      await User.deleteOne({ _id: userAlreadyExists._id }); // Delete user if expired
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Generate verification token and expiry
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationTokenExpriresAT = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // Create user object
    const user = new User({
      email: email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpriresAT,
    });

    // Save user
    const savedUser = await user.save();

    // Generate token and set cookie for the user
    generateTokenAndSetcookie(res, savedUser._id);

    // Send verification email
    sendVerificationEmail(user.email, verificationToken);

    // Send success response
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined, // Don't return the password
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    console.log(code);
    // Find user by verification code and ensure the token has not expired
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpriresAT: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }

    // Check if the verification token is expired and delete if needed
    const expirationTime = user.verificationTokenExpriresAT;
    if (Date.now() - expirationTime > 60000) { // 1 minute = 60000 ms
      await User.deleteOne({ _id: user._id }); // Delete user if expired
      return res.status(400).json({ message: "Verification code expired. User deleted." });
    }

    // Mark the user as verified if the token is valid
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpriresAT = undefined;
    await user.save();

    // Send a welcome email after successful verification
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", " ", { 
    httpOnly: true, 
    secure: true, 
    sameSite: "none", // Allow cross-origin requests (if frontend is on a different domain)
    expires: new Date(0) // Expire the cookie immediately
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try{

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpriresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpriresAt = resetTokenExpriresAt;

        await user.save();

        //send email

        await sendPasswordResetEmail(user.email, `${process.env.CLLENT_URL}reset-password/${resetToken}`);

        res.status(200).json({
            success: true,
            message: "Password reset link sent to your email"
        })


    } catch (error) {
        console.log("Error sending password reset email:", error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpriresAt: { $gt: Date.now() },
        });
        
        if (!user) {
            return res.status(400).json({ error: "Password reset token is invalid or has expired." });
        }

        if(!user) {
            res.status(400).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        //Update Password

        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpriresAt = undefined;

        //save user
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        console.log("Error in resetPassword:", error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user) {
            return res.status(400).json({success: false, message: "User not found"});
        }

        res.status(200).json({ success: true, user: {
            ...user._doc,
            password: undefined
        }});
    } catch (error) {
        console.log("Error in checkAuth", error);
        res.status(400).json({success: false, message: error.message});
    }
}

export const chatResponse = async (req, res) => {

  try {
   
    const { user_id, messageId, chat, response} = req.body;
    if (!user_id || !chat || !response) {
      throw new Error("Missing required fields");
    }
    // Creating a chatSession to push more chats
    let chatSession = await chatModel.findOne({ messageId });
    
    // User don't have chate Session it will create new one
    
    if(!chatSession) {
      chatSession = new chatModel({ user_id, messageId, chats: [] });
    }

    chatSession.chats.push({ chat, response})

    await chatSession.save();
    res.status(200).json({ success: true, message: "Chat added successfully" });
  } catch (error) {
    console.error('Error adding chat:', error);
    throw error;
  }
}
export const getChat = async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      throw new Error("Missing required field: id");
    }

    const chat = await chatModel.find({ user_id });
    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    console.log("Error in getChat:", error);
    res.status(400).json({ success: false, message: error.message });
  }
}