import React, { useState } from "react"
import { useNavigate } from "react-router";
import { loginUser } from "../../service/userService";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  //Navigate to homepage when user is logged in
  const Navigate = useNavigate();

  //Handle Change
  const handleChange = (e: any) => {
    setInput({
      ...input,
    [e.target.name]: e.target.value 
  });
  };
  //Handle Submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    loginUser(input);
    Navigate("/");
  };
  
  return (
    <>
    <div className="registration__container">
      <div className="registration__content">
        <h2>Login User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <label className="form-label"  htmlFor="emailInput">
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
          <div id="emailHelp" className="form-text">
             Your email is safe with us
          </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input 
            type="password" 
            className="form-control"
            id="examplInputPassword1"
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

export default Login;
