import React from "react";
import styles from './styles/App.css';
import logo from './assets/logo3.png';
import styled from 'styled-components';

class MintPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            layers: [],
            rarities: [],
            totalNFTs: null,
            contractType: null,
            contractDropdown: false,
            storageDropdown: false,
            storageType: null,
        };
        this.imagesSelectedHandler = this.imagesSelectedHandler.bind(this);
        this.layersSelectedHandler = this.layersSelectedHandler.bind(this);
        this.contractSelection = this.contractSelection.bind(this);
        this.storageSelection = this.storageSelection.bind(this);
    }
   imagesSelectedHandler = (event) => {
    this.setState({ images: event.target.files })
    console.log("upload file " + event.name)
  }
  layersSelectedHandler = (event) => {
    this.setState({ layers: event.target.files })
    console.log("upload file " + event.name)
    if (event.target.files) {
        const layerArray = Array.from(event.target.files).map((file)=> URL.createObjectURL(file))
        console.log(layerArray)
        this.setState ({
            layers: layerArray
        })

    
    }
  }
  contractSelection = async() => {
      this.setState ({
        contractDropdown: true
      });
      console.log(this.state.contractDropdown)
  }
  storageSelection = async() => {
    this.setState ({
      storageDropdown: true
    });
    console.log(this.state.storageDropdown)
}

    render() {
        const Main = styled("div")`
        font-family: sans-serif;
        background: #f0f0f0;
        height: 100vh;
        `;

        const DropDownContainer = styled("div")`
        width: 10.5em;
        margin: 0 auto;
        `;

        const DropDownHeader = styled("button")`
        margin-bottom: 0.8em;
        padding: 0.4em 2em 0.4em 1em;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
        font-weight: 500;
        font-size: 1.3rem;
        color: #3faffa;
        background: #ffffff;
        `;

        const DropDownListContainer = styled("div")``;

        const DropDownList = styled("ul")`
        padding: 0;
        margin: 0;
        padding-left: 1em;
        background: #ffffff;
        border: 2px solid #e5e5e5;
        box-sizing: border-box;
        color: #3faffa;
        font-size: 1.3rem;
        font-weight: 500;
        &:first-child {
            padding-top: 0.8em;
        }
        `;

        const ListItem = styled("li")`
        list-style: none;
        margin-bottom: 0.8em;
        `;
        const contractOptions = ["721", "1155"];
        const storageOptions = ["On-chain", "Off-chain"];

        const onContractClicked = value => () => {
            this.setState ({
                contractDropdown: false,
                contractType: value
              });
            console.log(this.state.contractType);
          };
          const onStorageClicked = value => () => {
            this.setState ({
                storageDropdown: false,
                storageType: value
              });
            console.log(this.state.contractType);
          };
          const renderLayers = (source) => {
              return source.map((layer) => {
                  return <img className={styles.imgPrev} src={layer} key={layer}/>
              })
          }

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
                        <input type="file" multiple accept="image/*" onChange={this.imagesSelectedHandler} />
                        <div>
                            <h2>Upload layers{console.log(this.state.images)}</h2>
                        </div>
                        <h3>Layers {console.log(this.state.layers)}</h3>
                            <input type="file" multiple onChange={this.layersSelectedHandler} />
                            <div>
                                {renderLayers(this.state.layers)}
                            </div>
                            
                        <DropDownContainer>
                            <DropDownHeader onClick={this.contractSelection}>Contract Type</DropDownHeader>
                            {this.state.contractDropdown && (
                            <DropDownListContainer>
                                <DropDownList>
                                {contractOptions.map(option => (
                                    <ListItem onClick={onContractClicked(option)} key={Math.random()}>
                                    {option}
                                    </ListItem>
                                ))}
                                </DropDownList>
                            </DropDownListContainer>
                            )}
                        </DropDownContainer>
                        <DropDownContainer>
                            <DropDownHeader onClick={this.storageSelection}>Storage Type</DropDownHeader>
                            {this.state.storageDropdown && (
                            <DropDownListContainer>
                                <DropDownList>
                                {storageOptions.map(option => (
                                    <ListItem onClick={onStorageClicked(option)} key={Math.random()}>
                                    {option}
                                    </ListItem>
                                ))}
                                </DropDownList>
                            </DropDownListContainer>
                            )}
                        </DropDownContainer>
                </form>    
                </div>
                <div>
                <h3>{this.state.contractType}</h3>
                </div>
                <h3>{this.state.storageType}</h3>
            </div>
        </div>
        )
    }
}
export default MintPage;