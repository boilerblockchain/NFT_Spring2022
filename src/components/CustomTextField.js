import { render } from "@testing-library/react";
import React from "react";

class TextField extends React.Component {

  constructor(props) {
    super(props);
    this.text = props.text

    this.state = {
      validity: ""
    };
  }

  // checks input email
  getInputValue = (event) => {
    const userValue = event.target.value;

    if (userValue.split("@")[1] === "purdue.edu") {
      this.setState({validity: "valid email!"});
    } else {
      this.setState({validity: "invalid email!"});
    }
  };

  render() {
    return (
      <div>
          <input
          placeholder={this.text}
          onChange={this.getInputValue}
          />
          <p>
            {this.state.validity}
          </p>
      </div>

    );
  }


}

export default TextField;
