import { cloudinaryInstance } from "../config/cloudinary.js"
import Turf from "../models/turf.js"

export const getTurfs=async(req,res,next)=>{
    try {
        const turfList=await Turf.find()
        res.json({data:turfList,message:"turfList fetched"})
        }
     catch (error) {
        return res.status(error.statusCode ||500).json({message:error.message||"Internal server error"})
}
}


export const getMyTurfs = async (req, res) => {
    try {
        const managerId = req.user.id; // Ensure req.user is set from authentication middleware
        const turfs = await Turf.find({ manager: managerId });

        if (!turfs.length) {
            return res.status(404).json({ message: "No turfs found" });
        }

        res.json({ data: turfs, message: "Your turfs fetched successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};
export const getTurfDetails = async (req, res, next) => {
    try {
        const {id} = req.params;
        console.log(id);
        
        const turfList = await Turf.findById(id).populate("manager", "name");
  
      res.json({
        data: turfList,
        message: "Turf details fetched successfully",
      });
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ message: error.message || "Internal server error" });
    }
  };
  
  export const addTurf = async (req, res, next) => {
    try {
      const {
        title,
        category,
        description,
        address,
        price,
        availableDates,
        availableTimeSlots
      } = req.body;
  
      const categoryArray = Array.isArray(category) ? category : category.split(",");
  
      if (!title || !categoryArray || !description || !address || !price || !availableDates || !availableTimeSlots) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const managerId = req.user.id;
  
      let cloudinaryResponse;
      if (req.file) {
        cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
      }
  
      const turfData = new Turf({
        title,
        price,
        category: categoryArray,
        description,
        address,
        availableDates,
        availableTimeSlots,
        image: cloudinaryResponse?.secure_url || req.body.image,
        manager: managerId,
      });
  
      await turfData.save();
  
      const populatedTurf = await Turf.findById(turfData._id).populate("manager", "name");
  
      res.json({ data: populatedTurf, message: "Turf added successfully" });
    } catch (error) {
      console.error("Error in addTurf:", error);
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  };
export const updateTurf = async (req, res, next) => {
    try {
        const turfId = req.params.id; 
        const { title, category, description, price, image, manager } = req.body;

        
        let imageUrl = image; // Default to existing image
        if (req.file) {
        const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
        imageUrl = cloudinaryResponse.url;
        }

      
        const updatedTurf = await Turf.findByIdAndUpdate(
        turfId,
        { title, category, description, price, image: imageUrl, manager: Array.isArray(manager) ? manager : [manager] },
        { new: true }
        );


        if (!updatedTurf) {
            return res.status(404).json({ message: "Turf not found" });
        }

        return res.json({ data: updatedTurf, message: "Turf details updated successfully" });

        } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
        }
        }; 

export const deleteTurf= async (req,res)=>{
        try {
            const turfId=req.params.id;
            const deleteId = await Turf.deleteOne({ _id: turfId });


            if (!deleteId) {
                return res.send("not deleted");
            }
            return res.send("turf deleted");
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
        }
 
        
export const findTurfById=async (req,res)=>{
    try {
        const turfId=req.params.id;
        const turf=await Turf.findById(turfId)
        if (!turf) {
            return res.status(404).json({ message: "Turf not found" });
        }
            return res.json({data:turf,message:"Turf profile fetched successfully"});
        
        } catch (error) {
            return res.status(500).json({ message: error.message || "Internal server error" });
        }
       };
    
      

       export const findTurfByCategory = async (req, res) => {
        try {
            const { categories } = req.query; // Get categories from query params
    
            // Validate categories
            if (!categories) {
                return res.status(400).json({ message: "Categories query parameter is required" });
            }
    
            const categoryArray = categories.split(",").map(cat => cat.trim()); // Convert string to array and trim spaces
    
            if (categoryArray.length === 0) {
                return res.status(400).json({ message: "At least one category must be provided" });
            }
    
            console.log("Searching for categories:", categoryArray);
    
            const turfs = await Turf.find({ category: { $in: categoryArray } });
    
            if (turfs.length === 0) {
                return res.status(404).json({ message: "No turfs found for these categories" });
            }
    
            return res.json(turfs);
        } catch (error) {
            console.error("Error fetching turfs:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
    
      