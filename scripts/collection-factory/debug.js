const NFTCollectionFactory = artifacts.require("NFTCollectionFactory");

module.exports = async function (callback) {
    try {
        const factory = await NFTCollectionFactory.deployed();

        await factory.createNFTCollection('Digimon', 'DIG', 'Coucou description', 'Adrien')
    } catch (error) {
        console.log("error", error);
    }

    callback();
};
