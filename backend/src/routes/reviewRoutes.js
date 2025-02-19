import e from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { addReview, deleteReview, getAverageRating,  getTurfReviews } from "../controllers/reviewController.js";


const router=e.Router()



router.post("/add-review/:turfId", userAuth, addReview);
router.get("/get-turf-reviews/:turfId",getTurfReviews);
router.delete('/delete-review/:reviewId',userAuth,deleteReview);
router.get('/get-avg-rating/:turfId', getAverageRating);


export {router as reviewRouter}




