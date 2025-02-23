import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized. Token missing.", success: false });
        }

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error("JWT Verification Failed:", err.message);
                return res.status(403).json({ message: "Invalid or expired token.", success: false });
            }

            req.user = decoded; // Attach user data to request
            next();
        });

    } catch (error) {
        console.error("JWT Middleware Error:", error.message);
        return res.status(500).json({ message: "Server error.", success: false });
    }
};
