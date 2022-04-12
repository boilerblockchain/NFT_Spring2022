import React from "react";
import './styles/App.css';
import logo from './assets/logo3.png';

class MintPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            layers: [],
            rarities: [],
            totalNFTs: null,
            contractType: null,


        };
        this.imagesSelectedHandler = this.imagesSelectedHandler.bind(this);
        this.layersSelectedHandler = this.layersSelectedHandler.bind(this);
    }
   imagesSelectedHandler = (image) => {
    let addedImages = this.state.images.concat(image)
    this.setState({ images: addedImages })
    console.log("upload file " + image.name)
  }
  layersSelectedHandler = (layer) => {
    let addedLayers = this.state.layers.concat(layer)
    this.setState({ layers: addedLayers })
    console.log("upload file " + layer.name)
  }
    render() {
        return (
            <div className="MintPage">
                <img src={logo} className="App-logo" alt="logo"/>
            <p>
                <code>BoilerBlockchain</code>
            </p>
            <div className="container">
                <div className="header-container">
                    <p className="header gradient-text">Mint Your Own NFT</p>
                    < form >
                    <div>
                        <h2>Upload images</h2>
                    </div>
                    <h3>Images</h3>
                    <input type="file" multiple onChange={this.imagesSelectedHandler} />
                    <div>
                        <h3>Number of Images Uploaded: {this.state.images.length}</h3>
                    </div>
                    <div>
                        <h2>Upload layers</h2>
                    </div>
                    <h3>Layers</h3>
                    <input type="file" multiple onChange={this.layersSelectedHandler} />
                </form>    
                </div>
            </div>
        </div>
        )
    }
}
export default MintPage;