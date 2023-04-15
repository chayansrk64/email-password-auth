import React, { useState } from 'react';
import './Register.css'
const Register = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value)
    }
    const handleBlur = (event) => {
        console.log(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault(); // abstain from loading page 
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
    }
    return (
        <div>
           <h2>Register</h2>
           <form onSubmit = {handleSubmit}>
            <input onChange={handleEmailChange} type="email" name="email" id="email" className='email-pass' placeholder='Your Email' /> <br />
            <input onBlur={handleBlur} type="password" name="password" id="password" className='email-pass' placeholder='Your Password' /> <br />
            <input type="submit" value="Register" className='register' />
           </form>
        </div>
    );
};

export default Register;