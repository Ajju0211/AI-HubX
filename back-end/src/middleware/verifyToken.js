import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        
        return res.status(401).json({
            success: false,
            message: "Acceess denied"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {res.status(400).json({
            success: false,
            message: "Invalid token"})
        }
        req.userId = decoded.userId;
        next()
    } catch (error) {
        console.log(`Error verifying token: ${error}`);
        res.status(401).json({ success: false, message: "Server Error", Error: error})
    }
}