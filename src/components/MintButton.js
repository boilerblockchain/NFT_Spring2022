import { render } from "@testing-library/react";
import React from "react";

class MintButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            clicked: props.mintClick
        };
    }

    mint(image) {
        console.log(this.props.NFT)
        // pinFileToIPFS(image)
    }

    updateAvail() {
        this.setState = ({clicked: "null"});
    }

    render() {
        return (
            <button onClick={this.state.clicked}>Mint</button>
        );
    }
}
export default MintButton;
