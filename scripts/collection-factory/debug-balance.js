const NFTCollectionFactory = artifacts.require("NFTCollectionFactory");
const UpgradableGenericNFT = artifacts.require("UpgradableGenericNFT");

module.exports = async function (callback) {
    try {
        const accounts = await web3.eth.getAccounts();
        const account1 = accounts[1];

        const factory = await NFTCollectionFactory.deployed();

        console.log('factory address', factory.address)

        const balance = await factory.getOwnerBalance(account1)
        const address = await factory.getOwnerCollectionByIndex(account1, 0)

        console.log("account", account1);
        console.log("balance", balance.toString(), address);


        const customCollection = await UpgradableGenericNFT.at(address);
        const owner = await customCollection.owner();

        console.log("owner", owner);
    } catch (error) {
        console.log("error", error);
    }

    callback();
};
