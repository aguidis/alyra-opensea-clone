const { ethers } = require("ethers");
const Artifact = require("./client/src/contracts/CometSpaceshipNFT.json");

// For example here, interact with Alchemy JSON-RPC
const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");

const contractAddress = "0x779695A22384D4d04D46DDd7cEABA1d253d40D9b";

const contract = new ethers.Contract(contractAddress, Artifact.abi, provider);

// Call a getter method
contract.totalSupply().then((response) => {
    console.log(response.toString());
});
