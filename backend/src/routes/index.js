import e from "express";
import { userRouter } from "./userRoutes.js";
import { managerRouter } from "./managerRoutes.js";
import { turfRouter } from "./turfRoutes.js";
import { cartRouter } from "./cartRoutes.js";
import { reviewRouter } from "./reviewRoutes.js";
import {bookingRouter} from "./bookingRoutes.js";
import { AdminRouter } from "./adminRoutes.js";
import { paymentRouter } from "./paymentRoutes.js";


const router=e.Router()

router.use('/user',userRouter)
router.use('/manager',managerRouter)
router.use('/admin',AdminRouter)
router.use('/turf',turfRouter)
router.use('/cart',cartRouter)
router.use('/review',reviewRouter)
router.use('/bookings',bookingRouter)
router.use('/payments',paymentRouter)

export{router as apiRouter}




