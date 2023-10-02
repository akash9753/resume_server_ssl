import mongoose from 'mongoose';
const connectDB = async() =>{
    try{
      await mongoose.connect("mongodb+srv://akash9753:k8dA72632IPe2pFN@cluster0.fbgtrnm.mongodb.net/Re?retryWrites=true&w=majority")
      console.log(`Mongodb connected ${mongoose.connection.host}`);
    }catch(error){
      console.log(`MongoDB Server Issue ${error}`);
    }
}

export default connectDB;