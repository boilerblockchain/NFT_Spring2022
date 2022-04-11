import React, { useState } from 'react';
import ReactDOM from 'react-dom'; // can be used to swap pages
import axios from 'axios' // connect frontend and backend
import { useMoralis } from "react-moralis";
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"

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
    const [wallets, setWallets] = useState([]);
    // Moralis state variables
    const {
        authenticate,
        signup,
        isAuthenticated,
        user,
        account,
        setUserData,
        logout
    } = useMoralis();

    // functions to change the state based on form changes
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
     * OLD - for MongoDB implementation
     * Gathers state values from the form.
     * Uses axios post() to send a json object registered to
     * backend which sends it to mongodb
     */
    // const onSubmit = async (event) => {
    //     event.preventDefault() // Prevents redirect after signup
    //
    //     /*
    //      * Could be something else usually in a default way
    //      * Application usually refreshes or swaps page
    //      */
    //
    //     const registered = {
    //         fullName:this.state.fullName,
    //         username:this.state.username,
    //         email:this.state.email,
    //         password:this.state.password
    //     }
    //
    //     axios.post('http://localhost:4000/app/signup', registered) // post request with registered
    //         .then(response => console.log(response.data))
    //     this.setState({
    //         fullName:'',
    //         username:'',
    //         email:'',
    //         password:''
    //     })
    //
    //     // loads app.js on submit
    //     ReactDOM.render(
    //         <React.StrictMode>
    //           <App />
    //         </React.StrictMode>,
    //         document.getElementById('root')
    //     );
    // }

    /*
     * Uses the MoralisSDK to send and register a Moralis
     * object to a Moralis server
     */
    const handleSignUp = async (event) => {
        event.preventDefault() // Prevents redirect after signup

        // Check for existing authentication
        if (!isAuthenticated) {
            // Sign up user using non-crypto (no wallet) Moralis signup
            await signup(username, password, email);

            // Renders rest of NFT-Minter App
            ReactDOM.render(
                <React.StrictMode>
                    <App/>
                </React.StrictMode>,
                document.getElementById('root')
            );
        }
    }

    /*
     * Uses the MoralisSDK to login a user
     * using Metamask.
     */
    const handleLogin = async (event) => {
        event.preventDefault() // Prevents redirect after signup

        if (!isAuthenticated) {
            // Authenticate a user using Metamask, prompting them to login and sign
            await authenticate({ signingMessage: "Moralis Authentication" });

            // Check if the corresponding user exists in Moralis
            // TODO

            // Renders rest of NFT-Minter App
            ReactDOM.render(
                <React.StrictMode>
                    <App/>
                </React.StrictMode>,
                document.getElementById('root')
            );
        }
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

                        <input type='submit' className='btn btn-danger btn-block' value='Submit'/>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Login;
