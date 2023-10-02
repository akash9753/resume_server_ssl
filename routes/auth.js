import express from "express"
import { SignupController,signinController } from "../controller/auth.js"

const router = express.Router()

router.post("/signup",SignupController)
router.post("/signin",signinController)

export default router;