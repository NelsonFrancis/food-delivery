import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import foodRouter from "./routes/food.route.js"
import userRouter from "./routes/user.route.js"

dotenv.config({
    path: './.env'
})

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(process.env.PORT,() => {
    console.log(`Server started on port ${process.env.PORT}`)
})