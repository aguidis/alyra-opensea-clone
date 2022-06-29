const CometSpaceshipNFT = artifacts.require("CometSpaceshipNFT");

// Go to https://www.convertcsv.com/csv-to-json.htm
// Then convert the content of assets/metadata_urls.csv to json
const data = [
    {
        "ITEM": "Drone",
        "IPFS_URL": "ipfs://bafyreiam342kplsnrezekti23laywwizzdu5oldz3zes7cr5ei2nh4xuii/metadata.json"
    },
    {
        "ITEM": "Explorer",
        "IPFS_URL": "ipfs://bafyreib2wrqeerrd6e4b47pjvh3kdsjwmep5oe66grswvtmwrwj74u4t7q/metadata.json"
    },
    {
        "ITEM": "Jumper",
        "IPFS_URL": "ipfs://bafyreig4hcwvpwxcgq44hzg2afkozjztukwh5dixqqniyostk3moivtrj4/metadata.json"
    }
]

module.exports = async function (callback) {
    try {
        const accounts = await web3.eth.getAccounts();
        const owner = accounts[0];
        const contract = await CometSpaceshipNFT.deployed();

        for (let index = 0; index < data.length; index++) {
            const record = data[index];
            console.log(`Minting: ${record["ITEM"]} (${record["IPFS_URL"]})`);

            await contract.safeMint(owner, record["IPFS_URL"]);
        }
    } catch (error) {
        console.log("error", error);
    }

    callback();
};
