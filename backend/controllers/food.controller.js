import foodModel from "../models/food.model.js";
import fs from 'fs'

const addFood = async (req, res) => {
     console.log("Body:", req.body);
  console.log("File:", req.file);
    const {name, description, price, category} = req.body;
    const image_filename = req.file ? req.file.filename : null;

    const food = new foodModel({
        name, description, price, category, image: image_filename
    })
    try {
        await food.save();
        res.json({success: true, message: "Food added"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Something went wrong while saving food"})
    }
}


const getAllFoods = async(req, res) => {
    try {
        const foodList = await foodModel.find({});
        res.json({success: true, data: foodList});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Something went wrong while fetching food list"})
    }
}


const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food deleted"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Something went wrong while deleting food"})
    }
}

export {addFood, getAllFoods, removeFood}
