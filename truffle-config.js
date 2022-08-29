const path = require("path");
require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraKey = process.env.INFURA_KEY;
const mnemonic = process.env.MNENOMIC;

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        develop: {
            host: "127.0.0.1",
            port: 7545,
            network_id: 1337
        },
        rinkeby: {
            provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
            network_id: 4
        }
    },
    compilers: {
        solc: {
            version: "^0.8.0"
        }
    }
};
