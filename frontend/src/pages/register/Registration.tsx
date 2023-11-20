import React, { useState } from "react";
import "./register.css";
import { registerUser } from "../../service/userService";
import { useNavigate } from "react-router-dom";


const Registration = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const navigate = useNavigate();

  //handle change 
  const handleChange = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  //handle Submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
   
    registerUser(input);
    
    navigate("/login")
  };
   

  return (
    <>
    <div className="registration__container">
      <div className="registration__content">
        <h2>Registration</h2> 
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="fullName">
               FullName
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputFullName1"
              name="fullName"
              value={input.fullName}
              onChange={handleChange} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="emailInput">
              Email address
            </label>
            <input 
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={input.email}
            onChange={handleChange} 
            />
            <div id="emailhelp" className="form-control">
              
              Your email is secure with us 
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input 
              type="password"
              className="form-control"
              id="exmpleInputPassword1"
              name="password"
              value={input.password}
              onChange={handleChange} 
              />
          </div>
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
        </form> 
      </div>
    </div>
    </>
  );
};

export default Registration;
