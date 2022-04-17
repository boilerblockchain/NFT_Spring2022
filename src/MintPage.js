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
            totalNFTs: null,
            contractType: null,
            contractDropdown: false,
            storageDropdown: false,
            storageType: null,
            rarityDropdown: false,
            rarities: [],
        };
        this.imagesSelectedHandler = this.imagesSelectedHandler.bind(this);
        this.layersSelectedHandler = this.layersSelectedHandler.bind(this);

        this.contractSelection = this.contractSelection.bind(this);
        this.storageSelection = this.storageSelection.bind(this);
        this.NewArray = this.NewArray.bind(this)
        this.OnInputchange = this.OnInputchange.bind(this);
    }


    imagesSelectedHandler = (event) => {
        this.setState({images: event.target.files})
        console.log("upload file " + event.name)
    }
    layersSelectedHandler = (event) => {
        this.setState({layers: event.target.files})
        console.log("upload file " + event.name)
    }
    contractSelection = async () => {
        this.setState({
            contractDropdown: true
        });
        console.log(this.state.contractDropdown)
    }
    storageSelection = async () => {
        this.setState({
            storageDropdown: true
        });
        console.log(this.state.storageDropdown)
    }
    raritySelection = async () => {
        this.setState({
            rarityDropdown: true
        })
        console.log(this.state.rariryDropdown)
    }

    OnInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    NewArray(size) {
        var x = [];
        for (var i = 0; i < size; ++i) {
            x[i] = i;
        }
        return x;
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
        const rarityFields = this.NewArray(this.state.layers.length)


        const onContractClicked = value => () => {
            this.setState({
                contractDropdown: false,
                contractType: value
            });
            contractDropdownPlaceholder = value;
            console.log(this.state.contractType);
        };
        const onStorageClicked = value => () => {
            this.setState({
                storageDropdown: false,
                storageType: value
            });
            storageDropdownPlaceholder = value;
            console.log(this.state.contractType);
        };
        var contractDropdownPlaceholder = "Contract Type"
        var storageDropdownPlaceholder = "Storage Type"


        return (
            <div className="MintPage">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    <code>BoilerBlockchain</code>
                </p>
                <div className="container">
                    <center>
                        <div className="header-container">
                            <p className="header gradient-text">Mint Your Own NFT</p>
                            < form>
                                <div>
                                    <h2>Upload images</h2>
                                </div>
                                <h3>Images</h3>
                                <input type="file" multiple accept="image/*" onChange={this.imagesSelectedHandler}/>
                                <div>
                                    <h2>Upload layers{console.log(this.state.images)}</h2>
                                </div>
                                <h3>Layers {console.log(this.state.layers)}</h3>
                                <input type="file" multiple onChange={this.layersSelectedHandler}/>

                                <DropDownContainer>
                                    <DropDownHeader onClick={this.raritySelection}>Layer Rarities</DropDownHeader>
                                    {this.state.rarityDropdown && (
                                        <DropDownListContainer>
                                            <DropDownList>
                                                <form>
                                                    {rarityFields.map(option => (
                                                        <input
                                                            type="text"
                                                            name="rarity"
                                                            label={this.state.layers[option].name}
                                                            placeholder={this.state.layers[option].name}
                                                            value={this.state.rarities[option]}
                                                            onChange={this.OnInputchange}
                                                        />
                                                    ))}
                                                </form>
                                            </DropDownList>
                                        </DropDownListContainer>
                                    )}
                                </DropDownContainer>
                                <DropDownContainer>
                                    <DropDownHeader
                                        onClick={this.contractSelection}>{contractDropdownPlaceholder}</DropDownHeader>
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
                                    <DropDownHeader
                                        onClick={this.storageSelection}>{storageDropdownPlaceholder}</DropDownHeader>
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
                            <input
                                type="text"
                                name="totalNFTs"
                                placeholder="Total # NFTs"
                                value={this.state.totalNFTs}
                                onChange={this.OnInputchange}
                            />
                        </div>
                        <div>
                            <h3>{this.state.contractType}</h3>
                        </div>
                        <h3>{this.state.storageType}</h3>
                        <h3>{this.state.totalNFTs}</h3>
                        <div>
                            <button> Preview Collection</button>
                        </div>

                    </center>
                </div>

            </div>
        )
    }
}

//if (event.target.files) {
//  const layerArray = Array.from(event.target.files).map((file)=> URL.createObjectURL(file))
//  console.log(layerArray)
//  this.setState ({
//      layers: layerArray
//  })

//}
export default MintPage;
