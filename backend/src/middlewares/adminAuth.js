import jwt from "jsonwebtoken";
export const adminAuth=(req,res,next)=>{
    try {
        const token=req.cookies.token;
        console.log("Token received:", token);
        if (!token) {
            return res.status(401).json({message:"admin not authorised",success:false})
        }
        
        const tokenVerified=jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded Token:", tokenVerified);
        if (!tokenVerified) {
            return res.status(401).json({message:"admin not authorised",success:false})
        }
        
        req.user=tokenVerified;
        next();
    } catch (error) {
        return res.status(401).json({message:error.message||"admin autherization failed",success:false})
    }
}