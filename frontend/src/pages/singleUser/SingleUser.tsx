import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../service/userService';

const SingleUser = () => {
    const [user, setUser] = useState({
        _id: "",
        email: "",
        fullName:"",
        isAdmin: false,
    });

    const navigate = useNavigate();

    //Get the id from the url
    //const id = window.location.pathname.split("/")[2];

    //use params hook to get the id
    const { id }: any = useParams();

    //Handlechange function
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    //Handle update function
    const handleUpdate = async () => {
      await updateUser(id, user);  
      navigate("/users")
    };

    
     
    useEffect(() => {
        const fetchUserData = async () => {
          const response = await getUser(id); 

          setUser(response);
        };
        fetchUserData()
     }, [id]);

     //Use useEffect to get the user by id 

  return (
    <div className="container">
      <h1>Edit {user.fullName} Info.</h1>
      <table className="table mt-3 table-bordered">
        <thead>
            <tr>
                <th>Id</th>
                <th>Email</th>
                <th>Full Name</th>
                <th>IsAdmin</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{user._id}</td>
                <td>
                   <input 
                   type="text"
                   value={user.email}
                   className="form-control"
                   name="email" 
                   onChange={handleChange}
                   style={{
                    border: "none",
                    backgroundColor: "transparent"
                   }}
                   /> 
                </td>

                <td>
                   <input 
                   type="text"
                   value={user.fullName}
                   className="form-control"
                   name="fullName" 
                   onChange={handleChange}
                   style={{
                    border: "none",
                    backgroundColor: "transparent"
                   }}
                   /> 
                </td>


                <td>{user.isAdmin === false ? "No" : "Yes"}</td>
                <td>
                  <button onClick={handleUpdate} className="btn btn-primary me-3">
                    Update
                  </button>
                </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SingleUser;
