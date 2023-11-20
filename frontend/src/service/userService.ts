import axios from "axios";

const APIURL = "http://localhost:5001/api/v1";

const userData: any = localStorage.getItem("userManagementData");

//convert to json
const tokenData = JSON.parse(userData);

//Get the token from the data
export const { token } = tokenData || "";


export const registerUser = async (user: any) => {
    try {
      const res = await axios.post(`${APIURL}/users/register`, user);
      return res.data    
    } catch (error) {
        console.log(error)
    };
};

export const loginUser = async (user: any) => {
    try {
        localStorage.removeItem("userManagementData");
        const res = await axios.post(`${APIURL}/users/login`, user);
        //Save data to local storage
        const data = res.data;
        localStorage.setItem("userManagementData", JSON.stringify(data));
        window.location.href = "/"; // redirect to home page
        return res.data
    } catch (error) {
       console.log(error);
}
};

// Get all users service
export const getUsers = async () => {
    try {
        const res = await axios.get(`${APIURL}/users/all`, {
            headers: {
                Authorization: token,
            },
        });
        return res.data.users
    } catch (error) {
        console.log(error)
    }
};

//Get single user service
export const getUser = async (id: string) => {
    try {
      const res = await axios.get(`${APIURL}/users/${id}`, {
        headers: {
            Authorization: token,
        }
      });
      return res.data.user;  
    } catch (error) {
       console.log(error); 
    }
};


// Update user service 
export const updateUser = async (id: string, editData: any) => {
    try {
      const res = await axios.put(`${APIURL}/users/${id}`, 
      editData,
      {
        headers: {
            Authorization: token,
        },
      }
      );
      
      return res.data;
    } catch (error) {
      console.log(error)  
    }
};

//Logout user service 
export const logoutUser = () => {
    try {
      localStorage.removeItem("userManagementData");
      window.location.href = "/login";  
    } catch (error) {
      console.log(error);  
    }
};

//Delete user service
export const deleteUser = async(id: any) => {
    try {
      const res = await axios.delete(`${APIURL}/users/${id}`, {
        headers: {
            Authorization: token,
        }
      });
      return res.data  
    } catch (error) {
      console.log(error);  
    }
};