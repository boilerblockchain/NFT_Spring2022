import React from "react";
import App from "./App";
import logo from './assets/logo3.png';
import './styles/App.css';
import MintPage from "./MintPage.js";
import ReactDOM from 'react-dom';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            discord: "",
            password: "",
        };
        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }
    onInputchange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    
      onSubmitForm() {
        console.log(this.state)
        ReactDOM.render(
            <React.StrictMode>
                <MintPage />
            </React.StrictMode>,
            document.getElementById('root')
        );
      }
    render() {
        const { items } = this.state;
        return (
            <div className="SignUpPage">
            <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    <code>BoilerBlockchain</code>
                </p>
                <div className="container">
                    <div className="header-container">
                        <p className="header gradient-text">Mint Your Own NFT</p>
                        <form>
                <input 
                type="email" 
                name="email" 
                placeholder="Email"
                value={this.state.email}
                onChange={this.onInputchange}
                />
            <div className="form-group">
                <input 
                type = "discord" 
                name = "discord" 
                placeholder = "Discord tag"
                value={this.state.discord}
                onChange={this.onInputchange}
                />             
            </div>
            <div className="form-group">
                <input 
                type = "password" 
                name = "password" 
                placeholder = "Password"
                value={this.state.password}
                onChange={this.onInputchange}
                />             
            </div>
            <div>
                <button onClick={this.onSubmitForm}>Submit</button>
            </div>
            </form>
                    </div>
                </div>
          </div>
        
        );
    }
}
export default SignUpPage;