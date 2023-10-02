dotenv.config()
import express from "express"
import dotenv from "dotenv"
import morgan from 'morgan';
import path from "path";
import { fileURLToPath } from 'url';

import connectDB from "./config/db.js"
import authRouter from "./routes/auth.js"
import resumeForm from "./routes/resumeForm.js"


import cors from 'cors';
const port = 7000
connectDB()
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(morgan('dev'));
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('uploads',express.static(path.join(__dirname,"uploads")))

app.get('/',(req,res)=>{
  res.send("working...............")
})


app.use('/auth', authRouter);
app.use('/resume',resumeForm);

app.listen(port,()=>{
  console.log(`server started at port 7000`);
})