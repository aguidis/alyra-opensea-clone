const CometSpaceshipNFT = artifacts.require("SnakeNFT");

// Go to https://csvjson.com/csv2json
// Then convert the content of assets/metadata_urls.csv to json
const data = [
    {
        "ITEM": "Marvelous Snake #1",
        "IPFS_URL": "ipfs://bafyreihmz6oxwvejcnz44xryo3hpux6rnsncvbpstphstmq5zv54gu6z4i/metadata.json"
    },
    {
        "ITEM": "Marvelous Snake #2",
        "IPFS_URL": "ipfs://bafyreibrrxtjiyzi7rszlhsgyssttiqhy5m2egpptdrkbo7jkv2pjco2hu/metadata.json"
    },
    {
        "ITEM": "Marvelous Snake #3",
        "IPFS_URL": "ipfs://bafyreib6p4qzwl5yfcmzpk4yvqnl7nwebejgps6fdjyzibk7n42ifjnkmy/metadata.json"
    }
];

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
