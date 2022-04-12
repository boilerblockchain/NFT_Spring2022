import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios' // connect frontend and backend

import App from './App';
import ReactDOM from 'react-dom'; // can be used to swap pages
import WalletPage from './WalletPage';

/*
 * Login form that uses onChange values to
 * update state according to schema, onSubmit
 * saves state values in registered. onSubmit
 * sends registered to backend with axios to make
 * an http request to create a user.
 */
class Login extends Component {
    constructor () {
        super()
        this.state = {  // sign up form fields from schema
            fullName:'',
            username:'',
            email:'',
            password:''
        }

        // binds methods in constructor so calls work
        this.changeFullName = this.changeFullName.bind(this)
        this.changeUsername = this.changeUsername.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)

        this.onSubmit = this.onSubmit.bind(this)
    }
    // functions to change the state based on form changes
    changeFullName(event) {
        this.setState({
            fullName:event.target.value
        })
    }

    changeUsername(event) {
        this.setState({
            username:event.target.value
        })
    }

    changeEmail(event) {
        this.setState({
            email:event.target.value
        })
    }
    changePassword(event) {
        this.setState({
            password:event.target.value
        })
    }

    /*
     * Gathers state values from the form.
     * Uses axios post() to send a json registered to
     * backend which sends it to mongodb
     */
    onSubmit(event) {
        event.preventDefault() // Prevents redirect after signup

        /*
         * Could be something else usually in a default way
         * Application usually refreshes or swaps page
         */

        const registered = {
            fullName:this.state.fullName,
            username:this.state.username,
            email:this.state.email,
            password:this.state.password,
            wallet:WalletPage.wallet
        }

        axios.post('http://localhost:4000/app/signup', registered) // post request with registered
            .then(response => console.log(response.data))
        this.setState({
            fullName:'',
            username:'',
            email:'',
            password:''
        })

        // loads app.js on submit
        ReactDOM.render(
            <React.StrictMode>
              <App />
            </React.StrictMode>,
            document.getElementById('root')
          );
    }

    render () {
        return (
            <div>
                <div className='container'>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type='text'   // full name field
                            placeholder='Full Name'
                            onChange={this.changeFullName}
                            value={this.state.fullName}
                            className='form-control form-group' // bootstrap style classes
                            />      

                            <input type='text' // username field
                            placeholder='Username'
                            onChange={this.changeUsername}
                            value={this.state.username}
                            className='form-control form-group' 
                            />


                            <input type='text' // email field
                            placeholder='E-mail'
                            onChange={this.changeEmail}
                            value={this.state.email}
                            className='form-control form-group' 
                            />


                            <input type='password' // password field
                            placeholder='password'
                            onChange={this.changePassword}
                            value={this.state.password}
                            className='form-control form-group' 
                            />

                            <input type='submit' className='btn btn-danger btn-block' value='Submit'/>
                        </form>
                    </div>
                </div>

            </div>
        );
    }

}

export default Login;
