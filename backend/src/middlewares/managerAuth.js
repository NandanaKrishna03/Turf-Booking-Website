export const managerAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("Token received:", token);

        if (!token) {
            return res.status(401).json({ message: "Manager not authorized", success: false });
        }

        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded Token:", tokenVerified);

        if (!tokenVerified || (tokenVerified.role !== 'manager' && tokenVerified.role !== 'admin')) {
            return res.status(401).json({ message: "Manager not authorized", success: false });
        }

        req.user = tokenVerified;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message || "Manager authorization failed", success: false });
    }
};
