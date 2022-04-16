import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App';
import MintPage from './MintPage'
import ReactDOM from 'react-dom'; // can be used to swap pages
import WalletPage from './WalletPage';

import { useMoralis, MoralisProvider } from "react-moralis";

/*
 * Create account form that uses onChange values to
 * update state according to schema, onSubmit
 * saves state values in registered. onSubmit
 * sends registered to backend with axios to make
 * an http request to create a user.
 */
const CreateAccountPage = (props) => {

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [discord, setDiscord] = useState('');
    const [discordValid, setDiscordValid] = useState(false);
    const [password, setPassword] = useState('');

    const {
        authenticate,
        isAuthenticated,
        user,
        ethAddress,
        setUserData,
    } = useMoralis();


    // functions to change the state based on form changes
    const changeFullName = async(event) => {
        setFullName(event.target.value)
    }

    const changeUsername = async(event) => {
        setUsername(event.target.value)
    }

    const changeEmail = async(event) => {
        setEmail(event.target.value)
    }

    const reverse = (str) => {  
        let reversed = "";      
         for (var i = str.length - 1; i >= 0; i--){         
           reversed += str[i];  
         }     
        return reversed;
    }

    const changeDiscord = (event) => {
        setDiscord(event.target.value)
        var end = reverse(reverse(event.target.value).split("#")[0]);
        var beginning = reverse(reverse(event.target.value).split("#")[1]);
        if (end.length === 4) {
            if ((parseInt(end) !== NaN) && (parseInt(end) >= 1000) && (parseInt(end) <= 9999)) {
                if ((beginning.length > 2) && (beginning.length < 32)) {
                    setDiscordValid(true)
                } else {
                    setDiscordValid(false)
                }
            } else {
                setDiscordValid(false)
            }
        } else {
            setDiscordValid(false)
        }
    }

    const checkDiscord = (validity) => {
        if (validity === true) {
            return "";
        } else {
            return "Invalid Discord, must be in proper form (i.e. Name#1234)"
        }
    }

    const changePassword = async(event) => {
        setPassword(event.target.value)
    }

    /*
     * Gathers state values from the form.
     * Uses axios post() to send a json registered to
     * backend which sends it to mongodb
     */
    const onSubmit = async(event) => {
        event.preventDefault() // Prevents redirect after signup
        if  (discordValid === true) {
            await authenticate({signingMessage: "Moralis Authentication"})
            await setUserData({
                "fullName": fullName,
                "username": username,
                "email": email,
                "discord": discord,
                "password": password
            });
            console.log("User data set " + user.get("fullName"))

            ReactDOM.render(
                <React.StrictMode>
                    <MoralisProvider serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL} appId={process.env.REACT_APP_MORALIS_APP_ID}>
                        <MintPage />
                    </MoralisProvider>
                </React.StrictMode>,
                document.getElementById('root')
              );
        } else {
            alert("Please ensure all fields are valid.")
            event.preventDefault()
        }
    }

    return (
        <div>
            <div className='container'>
                <div className='form-div'>
                    <form onSubmit={onSubmit}>
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

                        <input type='text' // discord field
                        placeholder='Discord'
                        onChange={changeDiscord}
                        value={discord}
                        className='form-control form-group' 
                        />

                        <p>{checkDiscord(discordValid)}</p>

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

export default CreateAccountPage;