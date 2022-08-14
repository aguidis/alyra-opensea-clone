const NFTCollectionFactory = artifacts.require("NFTCollectionFactory");

module.exports = async function (callback) {
    try {
        const accounts = await web3.eth.getAccounts();
        const account1 = accounts[1];

        const factory = await NFTCollectionFactory.deployed();

        const balance = await factory.getOwnerBalance()
        const address = await factory.getOwnerCollectionByIndex(0, {from: account1})

        console.log("balance", balance.toString(), address);
    } catch (error) {
        console.log("error", error);
    }

    callback();
};
