const NFTCollectionFactory = artifacts.require("NFTCollectionFactory");

module.exports = async function (callback) {
    try {
        const accounts = await web3.eth.getAccounts();

        const factory = await NFTCollectionFactory.deployed();

        await factory.createNFTCollection('Digimon', 'DIG', 'Coucou description', 'Adrien', {from: accounts[1]})
    } catch (error) {
        console.log("error", error);
    }

    callback();
};
