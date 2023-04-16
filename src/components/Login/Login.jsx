import React, { useState } from "react";



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
    }
  return (
    <div>
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
      <div ><p className="text-danger text-center ">{success}</p></div>
    </div>
  );
};

export default Login;
