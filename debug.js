const { ethers } = require("ethers");
const Artifact = require("./client/src/contracts/CometSpaceshipNFT.json");

// For example here, interact with Alchemy JSON-RPC
const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");

/*
Pokemon
0x779695A22384D4d04D46DDd7cEABA1d253d40D9b
Snake
0x4c4D5b976Ab3cE7C0ca3f5724edB7bc6feeb41F4
Spaceship
0x0fD6ACFfD8FaD25ffa80A2d795Dd85Ef5c686E3E
MarketPlace
0x9a60B80556F01e7524A831B232953b031F60F074
 */

const contractAddress = "0x0fD6ACFfD8FaD25ffa80A2d795Dd85Ef5c686E3E";

const contract = new ethers.Contract(contractAddress, Artifact.abi, provider);

// Call a getter method
contract.totalSupply().then((response) => {
    console.log(response.toString());
});
