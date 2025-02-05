import jwt from "jsonwebtoken";

export const generateTokenAndSetcookie = (res, userId) => {
    // Generate a token with the userId as payload
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    // Set the cookie on the response object
    res.cookie("token", token, {
        httpOnly: true,
        secure: true, // Ensure cookies work in production (HTTPS)
        sameSite: "none", // Allow cross-origin requests (if frontend is on a different domain)
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
};
