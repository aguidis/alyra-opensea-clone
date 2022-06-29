dotenv.config()

import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
import { parse } from 'csv-parse'

const API_KEY = process.env.NFT_STORAGE_API_KEY
const CSV_PATH = 'scripts/comet-spaceship-nft/assets/metadata.csv'
const PHOTO_PATH = 'scripts/comet-spaceship-nft/assets/photos/'

const parser = await parse({columns: true}, async function (err, records) {
    for (let index = 0; index < 3; index++) {
        const element = records[index]

        const name = element['Name']
        const description = element['Description']
        const color = element['Color']
        const model = element['Model']
        const race = element['Race']
        const serialNumber = element['SerialNumber']
        const number = element['Number']
        const picture = `${PHOTO_PATH}${number}.png`

        const attributes = createAttributes(color, model, race, serialNumber)

        await storeAsset(name, description, attributes, picture)
    }
});

fs.createReadStream(CSV_PATH).pipe(parser);

function createAttributes(color, model, race, serialNumber){
    let color_attr = JSON.parse(`{ "trait_type": "Color", "value": "${color}" }`)
    let model_attr = JSON.parse(`{ "trait_type": "Model", "value": "${model}" }`)
    let race_attr = JSON.parse(`{ "trait_type": "Race", "value": "${race}" }`)
    let serial_number_attr = JSON.parse(`{ "trait_type": "Serial Number", "value": ${serialNumber} }`)
    return [color_attr, model_attr, race_attr, serial_number_attr]
}

async function storeAsset(name, description, attributes, picture_path) {
    const client = new NFTStorage({ token: API_KEY })
    const metadata = await client.store({
        name: name,
        description: description,
        attributes: attributes,
        image: new File(
            [await fs.promises.readFile(picture_path)],
            `${name}.png`,
            { type: 'image/png' }
        ),
    })
    console.log(`${name}: ${metadata.url}`)
}
