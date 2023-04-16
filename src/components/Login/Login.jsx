import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import app from "../../firebase/firebase-config";

const auth = getAuth(app);

const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // validation 
        setSuccess('');
        setError('');
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        
         if(!/(?=.*[A-Z])/.test(password)){
            setError('Please provide at least an UPPERCASE charecter')
            return;
         }
         else if (!/(?=.*[0-9])/.test(password)){
            setError('Please provide at least 1 number')
            return;
         }
         else if(password.length < 6){
            setError('Password length must be 6 in number')
            return;
         }

         createUserWithEmailAndPassword(auth, email, password)
         .then(result => {
          const user = result.user;
          console.log(user);
          event.target.reset();
          setSuccess('User Logged in Succesfully')
         })
         .catch(error => {
          console.error(error);
          setError(error.message)
         })
    }
  return (
    <div>
      <h2 className="text-center">Log In</h2>
      <form onSubmit={handleSubmit} className="mx-auto w-25">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
      <div ><p className="text-danger text-center ">{error}</p></div>
      <div ><p className="text-center text-success ">{success}</p></div>
    </div>
  );
};

export default Login;
