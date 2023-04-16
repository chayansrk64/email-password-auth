import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import app from "../../firebase/firebase-config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
       /**
        * initially validation will be placed on register page and need not to do
        * it login page. if you use validation in login then you have to validate 
        * this login page as same as register page. (This login validation is optional)
       */
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
         //  signin after createUserWithEmailAndPassword 

         signInWithEmailAndPassword(auth, email, password)
         .then(result => {
          const user = result.user;
          // if(!user.emailVerified){
          //   alert('You are not verified!!!')
          // }
          console.log(user);

          event.target.reset();

          setSuccess('User Logged in Succesfully')
         })
         .catch(error => {
          console.error(error);
          setError(error.message)
         })
    }

    const handleResetPassword = () => {
       const email = emailRef.current.value;
       if(!email){
        alert('Please input your email')
        return;
       }
       sendPasswordResetEmail(auth, email)
       .then(()=> {
        alert('Please check your email')
       })
       .catch(error => {
          setError(error.message)
       })
    }


    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
   

  return (
    <div>
      <h2 className="text-center">Log In</h2>
      <form onSubmit={handleSubmit} className="mx-auto w-25">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            ref = {emailRef}
            className="form-control"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            // type="password"
            name="password"
            type={passwordVisible ? 'text' : 'password'}
            className="form-control"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
        <button className="btn btn-link" type="button" onClick={togglePasswordVisibility}>
        {passwordVisible ? 'Hide password' : 'Show password'}
          </button>
        <p><small>Forget password <button onClick={handleResetPassword} className="btn btn-link">Reset Password</button> </small></p>
        <p><small>New to this website? Please <Link to="/register">Register</Link> </small></p>
      </form>
      <div ><p className="text-danger text-center ">{error}</p></div>
      <div ><p className="text-center text-success ">{success}</p></div>
    </div>
  );
};

export default Login;
