import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom'; // can be used to swap pages
import axios from 'axios' // connect frontend and backend
import { useMoralis } from "react-moralis";
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import Moralis from "moralis";

/*
 * Login form that uses onChange values to
 * update state according to schema, onSubmit
 * saves state values in registered. onSubmit
 * sends registered to backend with axios to make
 * an http request to create a user.
 */
const Login = () => {
    // User state variables
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    // Moralis state variables
    const {
        authenticate,
        isAuthenticated,
        user,
        setUserData
    } = useMoralis();

    useEffect(async () => {
        // Handle re-render after signup()'s authenticate() call
        if (isSignUp) {
            // Setting user data
            await setUserData({
                "username": username,
                "password": password,
                "email": email,
                "fullName": fullName
            });
            await renderApp();
            return;
        }
        // Handle if cached user exists
        if (isAuthenticated) {
            console.log("Session already authenticated...")
            console.log("Welcome " + user.get('fullName') + ", " + user.get('email'))
            await renderApp();
        }
    }, [isAuthenticated, user]);

    // Functions to change the state based on form changes
    const changeFullName = async (event) => {
        setFullName(event.target.value);
    }

    const changeUsername = async (event) => {
        setUsername(event.target.value);
    }

    const changeEmail = async (event) => {
        setEmail(event.target.value);
    }

    const changePassword = async (event) => {
        setPassword(event.target.value);
    }

    /*
     * Uses the MoralisSDK to send and register a Moralis
     * object to a Moralis server
     */
    const handleSignUp = async (event) => {
        event.preventDefault(); // Prevents redirect after signup

        // Set signup to true in use effect
        setIsSignUp(true);

        // Authenticate will change user in state, so class will re-render
        await authenticate({signingMessage: "Moralis Authentication"});
    }

    /*
     * Uses the MoralisSDK to login a user
     * using Metamask.
     */
    const handleLogin = async (event) => {
        event.preventDefault() // Prevents redirect after signup

        // Set sign up to false in order to prevent incorrect choice on re-render
        setIsSignUp(false);

        if (!isAuthenticated) {
            // Authenticate a user using Metamask, prompting them to login and sign
            // Authenticate will change user in state, so class will re-render
            await authenticate({ signingMessage: "Moralis Authentication" });
        }
    }

    const renderApp = async () => {
        // Renders rest of NFT-Minter App
        ReactDOM.render(
            <React.StrictMode>
                <App/>
            </React.StrictMode>,
            document.getElementById('root')
        );
    }

    return (
        <div>
            <div className='container'>
                <div className='form-div'>
                    <form onSubmit={handleSignUp}>
                        <input type='text'   // full name field
                            placeholder='Full Name'
                            onChange={changeFullName}
                            value={fullName}
                            className='form-control form-group' // bootstrap style classes
                        />

                        <input type='text' // username field
                            placeholder='Username'
                            onChange={changeUsername}
                            value={username}
                            className='form-control form-group'
                        />

                        <input type='text' // email field
                            placeholder='E-mail'
                            onChange={changeEmail}
                            value={email}
                            className='form-control form-group'
                        />

                        <input type='password' // password field
                            placeholder='password'
                            onChange={changePassword}
                            value={password}
                            className='form-control form-group'
                        />

                        <input type='submit' className='btn btn-danger btn-block' value='Sign up'/>
                    </form>
                    <form onSubmit={handleLogin}>
                        <input type='submit' className='btn btn-danger btn-block' value='Login'/>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Login;
