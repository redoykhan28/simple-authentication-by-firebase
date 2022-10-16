import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app)

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [mail, setMail] = useState('')

    const loginHandler = (e) => {
        e.preventDefault()
        let form = e.target;
        let email = form.email.value
        let password = form.password.value

        console.log(email, password)

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                form.reset();
                setSuccess('Login Successful..!')
                setError('')
            })
            .catch(error => {

                console.error(error);
                setError(error.message)

            })
    }

    const forgetPassHandler = () => {

        sendPasswordResetEmail(auth, mail)
            .then(() => {
                alert('Please Check your mail to reset a new password!')
            })

    }

    const emailHandler = (e) => {

        let mail = e.target.value
        console.log(mail);
        setMail(mail)

    }
    return (
        <div>
            <form className='w-50 mx-auto' onSubmit={loginHandler}>
                <h3 className='text-warning my-4'>Login Here,</h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">UserName</label>
                    <input onBlur={emailHandler} type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your Email' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder='Enter your password' required />
                </div>
                <p><small className='my-2 text-danger'>{error}</small></p>
                <p><small className='my-2 text-success'>{success}</small></p>
                <button type="submit" className="btn btn-outline-warning mb-3">Submit</button>
                <p><small>Need an Account? <Link to={'/registration'}>Registration here..</Link></small></p>
                <p><small onClick={forgetPassHandler}>Forget Password? <Link>Click here..</Link></small></p>
            </form>
        </div>
    );
};

export default Login;