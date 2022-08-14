const NFTMarketplace = artifacts.require("NFTMarketplace");

module.exports = async function (callback) {
    try {
        const marketplace = await NFTMarketplace.deployed();

        const count = await marketplace.getCollectionCount();

        console.log("collection count", count.toString());
    } catch (error) {
        console.log("error", error);
    }

    callback();
};
