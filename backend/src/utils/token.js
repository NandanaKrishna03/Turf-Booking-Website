import jwt from 'jsonwebtoken';

export const generateToken = (id, role) => {
    try {
        // Set a default role of 'user' if no role is provided
        const token = jwt.sign({ id: id, role: role || 'user' }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Error generating token");
    }
};
