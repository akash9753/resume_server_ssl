import mongoose from "mongoose";
console.log('====================================');
console.log("akash");
console.log('====================================');
// Define the schema for the education, experience, skills, profileSummary, language, and hobbies subdocuments
const EducationSchema = new mongoose.Schema({
  id: Number,
  courseName: String,
  collegeName: String,
  startYear: Date,
  endYear: Date,
  cgpaOrPercentage: String,
});

const ExperienceSchema = new mongoose.Schema({
  id: Number,
  designation: String,
  companyName: String,
  startYear: Date,
  endYear: Date,
  workExperience: String,
  techStack: String,
});

const personalProjectSchema = new mongoose.Schema({
  isPersonalProject: Boolean,
  projects: [
    {
      id: Number,
      role: String,
      projectTitle: String,
      startDate: Date,
      endDate: Date,
      projectDetail: String,
      techStack: [],
      liveUrl: [String],
      githubLink:String
    },
  ],
});


const SkillSchema = new mongoose.Schema({
  id: Number,
  skill: String,
  ratting: String,
  primary: Boolean,
});

const ProfileSummarySchema = new mongoose.Schema({
  id: Number,
  profileSummary: String,
  primary: Boolean,
});

const LanguageSchema = new mongoose.Schema({
  id: Number,
  language: String,
  proficiency:String,
  primary: Boolean,
});

const HobbySchema = new mongoose.Schema({
  id: Number,
  hobbies: String,
  primary: Boolean,
});

// Define the main schema for the data
const ResumeFromSchema = new mongoose.Schema({
  resumeName:String,
  userId:String,
  firstName: String,
  resumeTemplateTitle:String,
  lastName: String,
  middleName: String,
  dob: Date,
  images: String,
  contactNo: String,
  emailId: String,
  websiteLink: String,
  linkedinLink: String,
  currentAddress: String,
  nativePlace: String,
  education: [EducationSchema],
  experience: [ExperienceSchema],
  skills: [SkillSchema],
  profileSummary: [ProfileSummarySchema],
  language: [LanguageSchema],
  hobbies: [HobbySchema],
  personalProject: personalProjectSchema,
});

// Create the mongoose model
const ResumeForm = mongoose.model("ResumeForm", ResumeFromSchema);

export default ResumeForm;
