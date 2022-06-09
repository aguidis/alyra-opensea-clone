const { ethers } = require("ethers");
const Artifact = require("./client/src/contracts/CometSpaceshipNFT.json");

// For example here, interact with Alchemy JSON-RPC
const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");

const contractAddress = "0x89F53B7bAc7D0429f6e128d45F21f69FBCdA16B3";

const contract = new ethers.Contract(contractAddress, Artifact.abi, provider);

// Call a getter method
contract.balanceOf("0xd3983e2590BE7c2FCc5A1DF25bDc37492dB92519").then((response) => {
    console.log(response.toString());
});
