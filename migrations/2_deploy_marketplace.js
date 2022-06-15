const MarketplaceNFT = artifacts.require("MarketplaceNFT");

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(MarketplaceNFT);
};
