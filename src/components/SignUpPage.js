import React from "react";
import App from "../App";
import logo from '../assets/logo3.png';
import '../styles/App.css';

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
      }
    render() {
        const { items } = this.state;
        return (
        <div className="SignUpPage">
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
                type = "Discord tag" 
                name = "Discord tag" 
                placeholder = "Discord Tag"
                value={this.state.discord}
                onChange={this.onInputchange}
                />             
            </div>
            <div className="form-group">
                <input 
                type = "Password" 
                name = "Password" 
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
        
        );
    }
}
export default SignUpPage;