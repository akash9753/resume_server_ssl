import ResumeForm from '../model/resumeForm.js'; // Import the updated model
import cloudinary from"../helper/cloudinary.js";
import {fileSizeFormatter} from  "../helper/fileSizeFormaatter.js"

export const createResume = async (req, res) => {
  try {
    console.log('====================================');
    console.log("----------------");
    console.log('====================================');
    console.log(`body`,req.body)
    console.log(`image`,req.body.image);
    
    //for Image---------------------------------------
    // let filesArray = [];
    // for (let i = 0; i < req.files.length; i++) {
    //   const { path } = req.files[i];
    //   const result = await cloudinary.uploader.upload(path, {
    //     folder: "images",
    //     width: 1920,
    //   });

    //   const file = {
    //     public_id: result.public_id,
    //     url: result.secure_url,
    //     imageName: req.files[i].originalname,
    //     imageType: req.files[i].mimetype,
    //     imageSize: fileSizeFormatter(req.files[i].size, 2),
    //   };
    //   console.log(`file`,file);
    //   filesArray.push(file);
    // }
    // console.log(`filesArray`,filesArray);
    //------------------------------------------------
    const formData = JSON.parse(req.body.formData);

    const newResume = new ResumeForm(formData);
    newResume.images = req.body.image;
    
    const savedResume = await newResume.save();
    res.status(201).json({success:true,message:"Resume Form Information Saved Successfully.",ResumeData:savedResume});
    
  } catch (error) {
    res.status(500).json({success:false, message: error.message });
    console.log(error)
  }
};


export const getAllResumesByUserId = async (req, res) => {
  try {
    console.log(req.params);
    const userId = req.params.id; 
    console.log(userId);
    const resumes = await ResumeForm.find({ userId: userId });
    const total= resumes.length;
    res.status(200).json({success:true,message:"",total:total,allResumeByUserId:resumes});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getResumeResumeId = async (req, res) => {
  try {
    console.log(req.params);
    const resumeId = req.params.id; 
    console.log(resumeId);
    const resume = await ResumeForm.findOne({ _id: resumeId });

   
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.status(200).json({success:true,message:"",resumeById:resume});
  } catch (error) {
    res.status(500).json({ success:false, message: error.message });
  }
};

export const deleteByResumeId = async (req, res) => {
  try {
    const resumeId = req.params.id; 
    const deletedResume = await ResumeForm.findByIdAndRemove(resumeId);

    if (!deletedResume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.status(200).json({ success: true, message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateResume = async (req, res) => {
  try {
    const { formData, image } = req.body; // Destructure formData and image from req.body
    const resumeId = req.params.id;
    const data = JSON.parse(formData);
    // Define the update data
    console.log(data);
    const updateData = {
      ...data, // Include formData
      images: image, // Update the images field with the new image
    };
    console.log(updateData);
    // Find the resume by ID and update it
    const updatedResume = await ResumeForm.findByIdAndUpdate(
      resumeId,
      updateData,
      { new: true } // Return the updated document
    );
    console.log(updateResume);
    if (!updatedResume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.status(200).json({ success: true, message: 'Resume updated successfully', updatedResume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
