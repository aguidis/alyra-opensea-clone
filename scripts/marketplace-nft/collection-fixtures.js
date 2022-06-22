const MarketplaceNFT = artifacts.require("MarketplaceNFT");

module.exports = async function (callback) {
    try {
        const contract = await MarketplaceNFT.deployed();

        await contract.addCollection(
            "Pokemon 1st Gen",
            "The first 150 original Pokemons",
            "0x779695A22384D4d04D46DDd7cEABA1d253d40D9b",
            "Satoshi Tajiri"
        );

        await contract.addCollection(
            "Marveloussss Snakes",
            "3 Marveloussss Snakes into the metaverse",
            "0x4c4D5b976Ab3cE7C0ca3f5724edB7bc6feeb41F4",
            "Voldemor"
        );

        await contract.addCollection(
            "Cometh Spaceships",
            "Cometh is a DeFi powered game with yield generating NFT. Get spaceships, explore the galaxy and earn tokens.",
            "0x0fD6ACFfD8FaD25ffa80A2d795Dd85Ef5c686E3E",
            "Cometh Forge"
        );

        const count = await contract.getCollectionCount();

        console.log("count", count.toString());
    } catch (error) {
        console.log("error", error);
    }

    callback();
};
