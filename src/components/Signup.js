import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [credentials, setCredentials] = useState({name: "",email: "", password:"",cpassword:""})
    let navigate = useNavigate();
    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
    
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name: credentials.name,email: credentials.email,password: credentials.password})
        });
        const json = await response.json();
        // console.log(json);
        if(json.success === true) {
            localStorage.setItem("token",json.authtoken);
            navigate('/')
        }else{
            alert("Invalid")
        }
        
      };
  return (
    <div>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" onChange = {onChange} aria-describedby="emailHelp" name="name" minLength = {2} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" onChange = {onChange} aria-describedby="emailHelp" name="email" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange = {onChange} name="password" minLength = {5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" onChange = {onChange} name="cpassword" minLength = {5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup