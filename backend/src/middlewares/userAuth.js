import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
    try {
        // Check if token exists in cookies
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: "User not authorized. Token missing.", success: false });
        }

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error("JWT Verification Error:", err.message); // Log for debugging
                return res.status(401).json({ message: "Invalid or expired token.", success: false });
            }

            req.user = decoded; // Attach decoded user info to request
            next();
        });

    } catch (error) {
        console.error("Authentication Middleware Error:", error.message); // Log error
        return res.status(401).json({ message: "User authorization failed.", success: false });
    }
};
