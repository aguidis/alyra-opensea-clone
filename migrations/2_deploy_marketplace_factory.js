const NFTMarketplace = artifacts.require("NFTMarketplace");
const NFTCollectionFactory = artifacts.require("NFTCollectionFactory");

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(NFTMarketplace);

    const NFTMarketplaceInstance = await NFTMarketplace.deployed();

    await deployer.deploy(NFTCollectionFactory, NFTMarketplaceInstance.address);
};
