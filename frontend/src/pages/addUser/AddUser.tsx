import React, { ChangeEvent, useState } from 'react'
import { registerUser } from '../../service/userService';

const AddUser = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "",
    });

    //Handle change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });  
    };

    //Handle sumit
    const handleSubmit = async(e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      await registerUser(userData);  

      //Clear input
      setUserData({
        fullName: "",
        email: "",
        password: "",
        country: "",
      });
    };

  return (
    <div className="container">
      <h1>Add a new user</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-3">
           <label htmlFor="fullname" className="form-label">
            Fullname
           </label>
           <input
             type="text"
             className="form-control"
             id="fullname"
             name="fullName"
             value={userData.fullName}
             onChange={handleChange} 
           />
        </div>

        <div className="container">
            <label htmlFor="email" className="form-control">
              Email Address
            </label>
           <input 
           type="email" 
           className="form-control"
           id="email"
           name="email"
           value={userData.email}
           onChange={handleChange}
           />
        </div>

        <div>
            <label htmlFor="password" className="form-control">
                Password
            </label>
            <input 
            type="password" 
            className="form-control"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            />
        </div>

         <div className="form-control">
            <label htmlFor="country" className="form-control">
                Country
            </label>
            <input 
              type="text"
              className="form-control"
              id="country"
              name="country"
              value={userData.country}
              onChange={handleChange}
             />
         </div>
         <button type="submit" className="btn btn-primary">
            Submit
         </button>
      </form>
    </div>
  )
}

export default AddUser;
