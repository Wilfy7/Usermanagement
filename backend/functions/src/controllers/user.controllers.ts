import { Request, Response} from "express";
import User from "../model/user.model";
import { comparePassword, hashedPassword } from "../services/securePassword";
import { genToken } from "../services/genToken";


export const registerUser = async (req: Request, res: Response) => {
    try {
      //Get the data from the request body
      const userData = req.body;

      //Check if the data is provided
      //By doing so, destructure the userData first
      const {fullName, email, password} = userData
       if(!fullName || !email || !password)
       return res.status(400).json({
      message: "Please provide info in the neccessary fields"
      });

      //Check if user already exist
       const existingUser = await User.findOne({email: userData.email});
       if(existingUser)
       return res
       .status(400)
       .json({message: "User already exist"});


       const passwordhashed = hashedPassword(password);

       //Create a new user
       const newUser = new User({
        ...userData,
        password: passwordhashed
       });
       
       //Save the user to the database
       const savedUser = await newUser.save();

      return res.status(200).json({
        message: "Registered",
        user: savedUser
      }); 

    } catch (error) {
        console.log(error)
        return res.status(500).json({
        message: "Internal server error"
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
     
    //Get the data from the request body
    const {email, password} = req.body;

    //check if data is provided
    if(!email || !password)
    return res
    .status(400)
    .json({ message: 
     "Provide all the neccessary requirements needed in the filed"
  });

  //Check if user existing
  const existingUser = await User.findOne({email});
  if(!existingUser)
  return res.status(400).json({
  message: "User does not exist"
});

//Check if password is correct
const isMatch = comparePassword(password, existingUser.password);

if(!isMatch)
  return res.status(400).json({
  message: "Invalid Credentials"
});

//find user without password
const user = await User.findOne({ email }).select({
  password: 0,
});

const token = genToken({ user }, "3d");

  return res.status(200).json({
    message: "User Logged in successfully",
    token,
  });
} catch (error) {
     console.log(error)
     return res.status(500).json({
     message: "Internal server error"});
  }
};


//Admin controller system

//Get all users controller
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    //Get all users from the database
    const users = await User.find({}).select({
      password: 0,
      __v: 0,
    });

    return res.status(200).json({
      message: "All Users",
      users
    });

  } catch (error) {
     console.log(error)
     return res.status(500).json({
      message: "Internal server error"
     })
  }
}

//Get a single user controller
export const getUser = async (req: Request, res: Response) => {
  try {
    //get the id from the params
    const { id } = req.params

    //Check if the id exist
    const existingUser = await User.findById(id).select({
      password: 0,
      __v: 0
    }); 

    if(!existingUser)
    return res.status(400).json({
    message: "User does not exist"
  });

  return res.status(200).json({
    message: "User Data",
    user: existingUser
  })
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

//Update a user controller
export const updateUser = async (req: Request, res: Response) => {
  try {
     
    //Get the user id from params
    const { id } = req.params;

    const existingUser = await User.findByIdAndUpdate(id, req.body, {
      new: true
    });

    //Check if the user exist in the database
    if (!existingUser)
    return res.status(400).json({
    message: "User does not exist"
  });

    return res.status(200).json({
      message: "User updated",
      user: updateUser
    });
    
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    //Get the user id from the params
      const { id } = req.params;

      //Check if the user exist
      const existingUser = await User.findByIdAndDelete(id);

      if(!existingUser)
        return res.status(400).json({
        message: "User does nnot exist"
    });

      return res.status(200).json({
        message: "User deleted"
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}