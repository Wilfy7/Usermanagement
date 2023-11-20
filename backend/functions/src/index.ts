import express, {Request, Response} from "express";
import chalk from "chalk"
import configApp from "./config/user.config";
import userRouter from "./routes/user.route";
import morgan from "morgan";
import connectDB from "./config/connectDB";
import * as functions from "firebase-functions";
import cors from "cors";

//Setting up express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(cors());


//Port of the server
const port = configApp.dev.port;



//Routes
app.use("/api/v1", userRouter)



app.listen(port, () => {
    console.log(
      chalk.yellow(`Server running on port: http//localhost:${port}`))
      connectDB();
});


//Handle unknown routes (404 Not Found)
app.use((req: Request, res: Response) => {
    return res.status(404).json({
        message: "Route not found"
    });
});

//Start the server for local development and remove the code when deploying to firebase
export const api = functions.https.onRequest(app);