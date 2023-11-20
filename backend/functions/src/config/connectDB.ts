import chalk from "chalk"
import mongoose from "mongoose"
import configApp from "./user.config";


const connectDB = async () => {
    try {
        
  
     await mongoose.connect(String(configApp.dev.db));
     console.log(chalk.cyanBright("MongoDB connected"));

    } catch (error) {
       console.log(chalk.redBright(error));
    }
 
};


export default connectDB;