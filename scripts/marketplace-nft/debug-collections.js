const MarketplaceNFT = artifacts.require("MarketplaceNFT");

module.exports = async function (callback) {
    try {
        const contract = await MarketplaceNFT.deployed();

        let collections = [];

        for (let i = 0; i < 3; i++) {
            const collection = await contract.getCollectionAtIndex(i);

            collections.push(collection);
        }

        console.log("collections", collections);
    } catch (error) {
        console.log("error", error);
    }

    callback();
};
