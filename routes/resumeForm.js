import express from 'express';
const router = express.Router();
import * as ResumeFromController from '../controller/resumeForm.js';
import auth from "../middleware/auth.js"
import uploadImage from'../helper/fileHelper.js';
// Define routes for your ResumeFrom model
router.get('/allResumeByUserId/:id',auth, ResumeFromController.getAllResumesByUserId);
router.get('/byResumeId/:id',auth, ResumeFromController.getResumeResumeId);
router.post('/formInfo',auth,uploadImage.any(), ResumeFromController.createResume);

router.delete('/deleteByResumeId/:id',auth, ResumeFromController.deleteByResumeId);
router.patch('/updateResume/:id', auth,uploadImage.any(), ResumeFromController.updateResume);
export default router;


 