import React, { useState } from 'react';
import './Register.css'

import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth"
import app from '../../firebase/firebase-config';
import {Link} from 'react-router-dom'

const auth = getAuth(app);

const Register = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleEmailChange = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value)
    }
    const handleBlur = (event) => {
        console.log(event.target.value);
    }

    const handleSubmit = (event) => {
        // 1. prevent page refresh
        event.preventDefault(); // abstain from loading page 
        setSuccess('');
        setError('')
        // 2. collect data
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log(name, email, password);
        // password validation 
        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please provide at least one Uppercase letter')
            return;
        }
        else if(!/(?=.*[0-9])/.test(password)){
            setError('Please provide at least one number')
            return;
        }
        else if (password.length < 6){
            setError('Please provide at least 6 characters')
            return;
        }
        // 3. create user in farebase for the first time
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user
            console.log(user);
            // setError('')
            event.target.reset();
            setSuccess('User logged in Successfully')
            sendVerificationEmail(result.user)
            updateUserData(result.user, name);
        })
        .catch(error => {
            console.error(error);
            setError(error.message);
        })
    }

    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
        .then(result => {
            console.log(result);
            alert('Please verifiy your email Address')
        })
    }

    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name,
        })
        .then(()=> {
            console.log('User name updated');
        })
        .catch(error => {
            setError(error.message)
        })
    }

    return (
        <div className='text-center'>
           <h2>Register</h2>
           <form onSubmit = {handleSubmit}>
            <input  type="text" name="name" id="name" className='email-pass' placeholder='Your Name' required /> <br />
            <input onChange={handleEmailChange} type="email" name="email" id="email" className='email-pass' placeholder='Your Email' required /> <br />
            <input onBlur={handleBlur} type="password" name="password" id="password" className='email-pass' placeholder='Your Password' required/> <br />
            <input type="submit" value="Register" className='register' />
           </form>
           <p><small>Already have an account? Please <Link to="/login">Login</Link> </small></p>
           <p className='text-danger' >{error}</p>
           <p className='text-success' >{success}</p>
        </div>
    );
};

export default Register;