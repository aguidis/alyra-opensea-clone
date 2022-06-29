const MarketplaceNFT = artifacts.require("MarketplaceNFT");
const CometSpaceshipNFT = artifacts.require("CometSpaceshipNFT");
const PokemonNFT = artifacts.require("PokemonNFT");
const SnakeNFT = artifacts.require("SnakeNFT");

module.exports = async function (callback) {
    try {
        const marketplaceNFT = await MarketplaceNFT.deployed();
        const cometSpaceshipNFT = await CometSpaceshipNFT.deployed();
        const pokemonNFT = await PokemonNFT.deployed();
        const snakeNFT = await SnakeNFT.deployed();

        await marketplaceNFT.addCollection(
            "Cometh Spaceships",
            "Cometh is a DeFi powered game with yield generating NFT. Get spaceships, explore the galaxy and earn tokens.",
            cometSpaceshipNFT.address,
            "Cometh Forge"
        );

        await marketplaceNFT.addCollection(
            "Pokemon 1st Gen",
            "The first 150 original Pokemons",
            pokemonNFT.address,
            "Satoshi Tajiri"
        );

        await marketplaceNFT.addCollection(
            "Marveloussss Snakes",
            "3 Marveloussss Snakes into the metaverse",
            snakeNFT.address,
            "Voldemor"
        );

        const count = await marketplaceNFT.getCollectionCount();

        console.log("count", count.toString());
    } catch (error) {
        console.log("error", error);
    }

    callback();
};
