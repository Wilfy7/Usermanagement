import { Request, Response, NextFunction } from "express"
import { decodeToken } from "../services/genToken";




export const isLoggedIn = (
  req: Request, 
  res: Response, 
  next: NextFunction) => {
  try {
     //Get the token from the headers
     const token = String(req.headers.authorization);
    

     //Check if token is provided
     if(!token)
     return res.status(400).json({
    message: "Please provide a token"
    });

    //Decode the token
    const decodedToken = decodeToken(token);

    //Define the isAdmin data and check if user is the admin
    const {user} = decodedToken as { user: {isAdmin: boolean}};

    const isAdmin = user.isAdmin;
    if(!isAdmin)
    return res.status(400).json({
  message: " You are not authorised "
  });

    next();
    return;

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}