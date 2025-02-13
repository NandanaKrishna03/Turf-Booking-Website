import express from "express"
const router=express.Router();

router.post("/signup",registerUser);

router.post("/login",registerUser);





module.exports = router;
export default express