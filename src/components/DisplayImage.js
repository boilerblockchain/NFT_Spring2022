import React, { Component } from "react";

class DisplayImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null
    };

    this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      // Send updated NFT to parent
      this.props.changeNFT(img)
      this.setState({
        image: URL.createObjectURL(img)
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <img src={this.state.image} className="display-img"/>
            <br/>
            <input type="file" name="myImage" onChange={this.onImageChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayImage;
