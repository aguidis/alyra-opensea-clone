const PokemonNFT = artifacts.require("PokemonNFT");

module.exports = function (deployer) {
    deployer.deploy(PokemonNFT);
};
