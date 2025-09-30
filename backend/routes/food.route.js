import express from "express";
import { addFood, getAllFoods, removeFood } from "../controllers/food.controller.js";
import multer from "multer";

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({
    storage: storage
})


foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/allFoods", getAllFoods);
foodRouter.post("/removeFood", removeFood);


export default foodRouter
