import { config } from "dotenv";


config();

const configApp = {
    dev : {
        port: process.env.PORT,
        db: process.env.MONGO_URL,
        secret: process.env.SECRET
    }
}


export default configApp;


