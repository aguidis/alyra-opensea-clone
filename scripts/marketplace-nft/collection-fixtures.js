const NFTMarketplace = artifacts.require("NFTMarketplace");
const CometSpaceshipNFT = artifacts.require("CometSpaceshipNFT");
const PokemonNFT = artifacts.require("PokemonNFT");
const SnakeNFT = artifacts.require("SnakeNFT");

module.exports = async function (callback) {
    try {
        const marketplace = await NFTMarketplace.deployed();
        const cometSpaceshipNFT = await CometSpaceshipNFT.deployed();
        const pokemonNFT = await PokemonNFT.deployed();
        const snakeNFT = await SnakeNFT.deployed();

        await marketplace.addCollection(
            "Cometh Spaceships",
            "Cometh is a DeFi powered game with yield generating NFT. Get spaceships, explore the galaxy and earn tokens.",
            cometSpaceshipNFT.address,
            "Cometh Forge"
        );
        await marketplace.verifyCollection(cometSpaceshipNFT.address);

        await marketplace.addCollection(
            "Pokemon 1st Gen",
            "The first 150 original Pokemons",
            pokemonNFT.address,
            "Satoshi Tajiri"
        );
        await marketplace.verifyCollection(pokemonNFT.address);

        await marketplace.addCollection(
            "Marveloussss Snakes",
            "3 Marveloussss Snakes into the metaverse",
            snakeNFT.address,
            "Voldemor"
        );
        await marketplace.verifyCollection(snakeNFT.address);

        const count = await marketplace.getCollectionCount();

        console.log("count", count.toString());
    } catch (error) {
        console.log("error", error);
    }

    callback();
};
