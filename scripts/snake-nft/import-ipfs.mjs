dotenv.config()

import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
import { parse } from 'csv-parse'

const API_KEY = process.env.NFT_STORAGE_API_KEY
const CSV_PATH = 'scripts/snake-nft/assets/metadata.csv'
const PHOTO_PATH = 'scripts/snake-nft/assets/photos/'

const parser = await parse({columns: true}, async function (err, records) {
    for (let index = 0; index < 3; index++) {
        const element = records[index]

        const name = element['Name']
        const description = element['Background']
        const skin = element['Skin']
        const expression = element['Expression']
        const clothes = element['Clothes']
        const headgear = element['Headgear']
        const accessories = element['Accessories']
        const number = element['Number']
        const picture = `${PHOTO_PATH}${number}.PNG`

        const attributes = createAttributes(skin, expression, clothes, headgear, accessories)

        await storeAsset(name, description, attributes, picture)
    }
});

fs.createReadStream(CSV_PATH).pipe(parser);

function createAttributes(skin, expression, clothes, headgear, accessories){
    let skin_attr = JSON.parse(`{ "trait_type": "Skin", "value": "${skin}" }`)
    let expression_attr = JSON.parse(`{ "trait_type": "Expression", "value": "${expression}" }`)
    let clothes_attr = JSON.parse(`{ "trait_type": "Clothes", "value": "${clothes}" }`)
    let headgear_attr = JSON.parse(`{ "trait_type": "Headgear", "value": "${headgear}" }`)
    let accessories_attr = JSON.parse(`{ "trait_type": "Accessories", "value": "${accessories}" }`)
    return [skin_attr, expression_attr, clothes_attr, headgear_attr, accessories_attr]
}

async function storeAsset(name, description, attributes, picture_path) {
    const client = new NFTStorage({ token: API_KEY })
    const metadata = await client.store({
        name: `Alyra ${name}`,
        description: description,
        attributes: attributes,
        image: new File(
            [await fs.promises.readFile(picture_path)],
            'SnakePhoto.png',
            { type: 'image/png' }
        ),
    })
    console.log(`${name}: ${metadata.url}`)
}
