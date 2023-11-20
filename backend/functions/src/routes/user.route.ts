import { isLoggedIn } from "../middleware/user.middleware";
import { deleteUser,
         getAllUsers,
         getUser, 
        loginUser, 
        registerUser, 
        updateUser 
} from "../controllers/user.controllers";
import { Router} from "express";




const userRouter = Router();

userRouter.post("/users/register", registerUser);
userRouter.post("/users/login", loginUser);

//Admin related routes
userRouter.get("/users/all", isLoggedIn, getAllUsers) 

userRouter.get("/users/:id", isLoggedIn, getUser); //Get a sinngle user route

userRouter.put("/users/:id", isLoggedIn, updateUser); //Update a user route

userRouter.delete("/users/:id", isLoggedIn, deleteUser) //Delete a user route


export default userRouter;