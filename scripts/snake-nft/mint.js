const CometSpaceshipNFT = artifacts.require("SnakeNFT");

// Go to https://www.convertcsv.com/csv-to-json.htm
// Then convert the content of assets/metadata_urls.csv to json
const data = [
    {
        ITEM: "Marvelous Snake #1",
        IPFS_URL: "ipfs://bafyreid2t5m3zir2bnp2br3do4bjz3mjage6wpvtnqodio3w6s7rpfnja4/metadata.json",
    },
    {
        ITEM: "Marvelous Snake #2",
        IPFS_URL: "ipfs://bafyreia6j24jw5ezkyfgsuwyrjalycn7n2qic7anfeontagxiiwfdbyfba/metadata.json",
    },
    {
        ITEM: "Marvelous Snake #3",
        IPFS_URL: "ipfs://bafyreifwy7errguo27zpuplgmoaxpyezohzzz4grubsw6w2rql3vg2clxa/metadata.json",
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

            await contract.safeMint(owner, record["IPFS_URL"]);
        }
    } catch (error) {
        console.log("error", error);
    }

    callback();
};
