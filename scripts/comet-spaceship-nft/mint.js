const CometSpaceshipNFT = artifacts.require("CometSpaceshipNFT");

// Go to https://www.convertcsv.com/csv-to-json.htm
// Then convert the content of assets/metadata_urls.csv to json
const data = [
    {
        ITEM: "Drone",
        IPFS_URL: "ipfs://bafyreic4yluurbye7z3mmwefckv2avp4qcxmoonxgo56jwc4bkduxj57rq/metadata.json",
    },
    {
        ITEM: "Explorer",
        IPFS_URL: "ipfs://bafyreiai4kx2mul5hshfpu624x27ynlc5antlmo2i2zwsvgxylnrafsnxy/metadata.json",
    },
    {
        ITEM: "Jumper",
        IPFS_URL: "ipfs://bafyreihm3f34p2jeifmk7xcnn5thrh5p5obqqlctdqlxqs234d47hfhgb4/metadata.json",
    },
];

module.exports = async function (callback) {
    try {
        const accounts = await web3.eth.getAccounts();
        const owner = accounts[0];
        const contract = await CometSpaceshipNFT.deployed();

        for (let index = 0; index < data.length; index++) {
            const record = data[index];
            console.log(`Minting: ${record["ITEM"]} (${record["IPFS_URL"]})`);

            await contract.mintNFT(owner, record["IPFS_URL"]);
        }
    } catch (error) {
        console.log("error", error);
    }

    callback();
};
