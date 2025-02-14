import jwt from 'jsonwebtoken'
export const generateToken=(id,role)=>{
    try {
        var token=jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        return token
    } catch (error) {
        
    }
}