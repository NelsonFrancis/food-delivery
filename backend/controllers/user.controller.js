import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

const loginUser = async(req, res) => {
    const {email, password} = req.body;

}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const registerUser = async(req, res) => {
    const {name, email, password} = req.body;
    try {
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success: false, message:"Email already used"})
        }
        if(!validator.isEmail(email)){
            return res.json({success: false, message:"Please enter valid email"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        })
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success: true, token})
         
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error while saving user"});
    }
}

export {loginUser, registerUser}