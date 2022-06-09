const CometSpaceshipNFT = artifacts.require("NFT/CometSpaceshipNFT");
const PokemonNFT = artifacts.require("NFT/PokemonNFT");
const SnakeNFT = artifacts.require("NFT/SnakeNFT");

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(CometSpaceshipNFT);
    await deployer.deploy(PokemonNFT);
    await deployer.deploy(SnakeNFT);
};
