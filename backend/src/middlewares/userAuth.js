import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "User not authorized", success: false });
        }

        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!tokenVerified) {
            return res.status(401).json({ message: "User not authorized", success: false });
        }

        req.user = tokenVerified;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message || "User authorization failed", success: false });
    }
};
