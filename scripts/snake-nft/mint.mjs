import { ethers } from 'ethers'
import { parse } from 'csv-parse'
import fs from 'fs'

const CONTRACT_ADDRESS = "0x0689a34eEd3498C5a310b93F016725f34F6246aE"
const METADATA_URLS_PATH = 'scripts/snake-nft/assets/metadata_urls.csv'

// Process CSV file
const parser = parse({columns: true}, async function (err, records) {
    console.log(records.length)
    for (let index = 0; index < records.length; index++) {
        const record = records[index]
        console.log(`Minting:${record['ITEM']}`)
        await mintNFT(record['IPFS_URL'])
    }
})

fs.createReadStream(METADATA_URLS_PATH).pipe(parser)

async function mintNFT(metaDataURL) {
    const ExampleNFT = await ethers.getContractFactory("PokemonNFT")
    const [owner] = await ethers.getSigners()
    await ExampleNFT.attach(CONTRACT_ADDRESS).mintNFT(owner.address, metaDataURL)
    console.log("NFT minted to: ", owner.address)
}
