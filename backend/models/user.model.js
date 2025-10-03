import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    cartData: {
        type: Object,
        default: {}
    }
}, {minimize: false})

const userModel = mongoose.models.user || mongoose.model("User", userSchema)

export default userModel