import e from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { addTurfToCart, deleteTurfFromCart, getCartByUserId } from "../controllers/cartController.js";


const router=e.Router()



router.get('/get-cart',userAuth,getCartByUserId)

router.post('/add-turf-to-cart',userAuth,addTurfToCart)

router.delete('/remove-turf-from-cart/:turfId', userAuth, deleteTurfFromCart)


export {router as cartRouter}




