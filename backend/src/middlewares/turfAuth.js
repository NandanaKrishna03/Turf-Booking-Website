import jwt from "jsonwebtoken";

export const turfAuth = (req, res, next) => {
    try {
        const token = req.cookies.turfToken || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Turf not authorised", success: false });
        }
        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!tokenVerified) {
            return res.status(401).json({ message: "Turf not authorised", success: false });
        }

        req.turf = tokenVerified;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message || "Turf authorisation failed", success: false });
    }
};
