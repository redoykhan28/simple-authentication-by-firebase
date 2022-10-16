import React, { useState } from 'react';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, sendEmailVerification, signInWithPopup } from 'firebase/auth'
import app from '../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app)

const Registration = () => {

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');

    const regHandler = (e) => {
        e.preventDefault()
        let form = e.target;
        let name = form.name.value;
        let email = form.email.value;
        let password = form.password.value;

        console.log(name, email, password)

        if (!/(?=.*[0-9])/.test(password)) {

            setError('Please use atleast a digits')
            return;
        }
        if (!/(?=.*[!@#$%^&*])/.test(password)) {

            setError('Please use atleast a special character(!,@,#,$,%,^,&,*)...')
            return;
        }
        if (password.length < 8) {

            setError('Please use atleast 8 length password...')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {

                const user = result.user;
                console.log(user);
                form.reset();
                setSuccess('Registration Successful');
                mailValidation();
                setError('');

            })

            .catch(error => {

                console.log(error);
                setError('Error! Email already exist')
            })
    }

    const mailValidation = () => {

        sendEmailVerification(auth.currentUser)
            .then(() => {

                alert('Validation link send to your mail. Please valid your mail!')
            })
    }

    //google varification
    const googleProvider = new GoogleAuthProvider();

    const googleHandler = () => {

        signInWithPopup(auth, googleProvider)
            .then(result => {

                const user = result.user;
                console.log(user)
            })
            .catch(error => {

                console.error(error)
            })

    }

    //facebook varification

    const facebookProvider = new FacebookAuthProvider();

    const facebookHandler = () => {

        signInWithPopup(auth, facebookProvider)
            .then(result => {

                const user = result.user
                console.log(user)
            })
            .catch(error => {

                console.error(error)
            })
    }

    return (

        <div>
            <form onSubmit={regHandler} className='w-50 mx-auto'>
                <h3 className='text-info my-3'>Registration here,</h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputText" className="form-label">Email address</label>
                    <input type="text" name='name' className="form-control" id="exampleInputText" aria-describedby="textHelp" placeholder='FullName' />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder='Email' required />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder='Password' />
                </div>
                <p><small className='text-danger mt-3'>{error}</small></p>
                <p><small className='text-success mt-3'>{success}</small></p>
                <button type="submit" className="btn btn-info text-white mb-3">Submit</button>

                <p><small>Already have an account? <Link to={'/login'}>Login from here..</Link></small></p>
            </form>

            <div className='text-center'>
                <button onClick={facebookHandler} className='btn btn-primary text-white mx-2'>Facebook</button>
                <button onClick={googleHandler} className='btn btn-secondary text-white'>Google</button>

            </div>

        </div>
    );
};

export default Registration;