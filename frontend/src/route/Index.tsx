import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Homepage from "../pages/home/Homepage";
import Registration from "../pages/register/Registration";
import Login from "../pages/login/Login";
import Footer from "../components/footer/Footer";
import Users from "../pages/getAllUsers/Users";
import { token } from "../service/userService";
import SingleUser from "../pages/singleUser/SingleUser";
import AddUser from "../pages/addUser/AddUser";

const Index= () => {
  const user = token;
  return (
    <BrowserRouter>
       <nav>
         <Navbar />
       </nav>

       <main>
         <Routes>
           {!user ? (
              <Route path="/" element={<Login />} /> 
            ) : (
              <Route path="/" element={<Homepage />} /> 
            
           )}


           {/* Protecting routing: If not a user go to register, but if user home */}
           {!user ? (
             <Route path="/registration" Component={Registration}/>
           ) : (
            <Route path="/registration" element={<Navigate to="/" />}/>
           )}

           
            {!user ? (
              <Route path="/login" Component={Login}/>
            ) : (
               <Route path="/login" element={<Navigate to="/" />}/>
            )}
            
            

           {user ? (
              <Route path="/users" Component={Users} />
           ) : (
              <Route path="/users" element={<Navigate to="/login" />} />
           )}
           
           {user ? (
              <Route path="/add-user" Component={AddUser} />
           ) : (
              <Route path="/add-user" element={<Navigate to="/login" />} />
           )}

          {/*Single User protecting route */}
          {user ? (
            <Route path="/users/:id" Component={SingleUser}/>
          ):(
            <Route path="/users/:id" element={<Navigate to="login"/>}/>
          )}

           <Route path="*" element={<h1> 404 Not Found </h1>}/>
         </Routes>
       </main>

       <footer>
         <Footer />
       </footer>
    </BrowserRouter>
  )
}

export default Index;
