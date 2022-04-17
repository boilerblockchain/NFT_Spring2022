import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import MintPage from './MintPage'
import logo from './assets/logo3.png';
import ReactDOM from 'react-dom'; // can be used to swap pages

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
    const [emailValid, setEmailValid] = useState(false);
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

    const changeEmail = (event) => {
        setEmail(event.target.value)
        if (event.target.value.split("@")[1] === "purdue.edu") {
            setEmailValid(true)
        } else {
            setEmailValid(false)
        }
    }

    const checkEmail = (validity) => {
        if (validity) {
            return "";
        }
        return "Invalid Purdue email address.";
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
        } 
        return "Invalid Discord, must be in proper form (i.e. Name#1234)"
    }

    const changePassword = async(event) => {
        setPassword(event.target.value)
    }

    const checkFields = () => {
        if (fullName != "") {
            if (username != "") {
                if (emailValid == true && discordValid == true) {
                    if (password != "") {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /*
     * Gathers state values from the form.
     * Uses axios post() to send a json registered to
     * backend which sends it to mongodb
     */
    const onSubmit = async(event) => {
        event.preventDefault() // Prevents redirect after signup
        if  (checkFields() == true) {
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
            <div className='Account-setup-page'>
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    <code className="boilerblockchain-text">BoilerBlockchain</code>
                </p>
                <p className="account-setup-text">ACCOUNT SETUP</p>
                <div className='form-div'>
                    <form onSubmit={onSubmit}>
                        <input type='text'   // full name field
                        placeholder='full name'
                        onChange={changeFullName}
                        value={fullName}
                        className='form-field' // bootstrap style classes
                        />      

                        <div className='form-trailing-space'></div>

                        <input type='text' // username field
                        placeholder='username'
                        onChange={changeUsername}
                        value={username}
                        className='form-field' 
                        />

                        <div className='form-trailing-space'></div>

                        <input type='text' // email field
                        placeholder='email'
                        onChange={changeEmail}
                        value={email}
                        className='form-field' 
                        />

                        <p className='err-text'>{checkEmail(emailValid)}</p>

                        <input type='text' // discord field
                        placeholder='discord'
                        onChange={changeDiscord}
                        value={discord}
                        className='form-field' 
                        />

                        <p className='err-text'>{checkDiscord(discordValid)}</p>

                        <input type='Password' // password field
                        placeholder='password'
                        onChange={changePassword}
                        value={password}
                        className='form-field' 
                        />

                        <div className='form-trailing-space'></div>

                        <button className="connect-wallet-btn" onClick = {onSubmit}> CREATE ACCOUNT </button> 
                    </form>
                </div>
            </div>

        </div>
    );

}

export default CreateAccountPage;