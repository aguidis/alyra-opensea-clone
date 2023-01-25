# FINAL PROJECT - Recreate a minimalist clone of OpenSea

Produce a decentralized application allowing artists to create their NFT collections and make them available for direct sale (in ETH).

- *Project link* : https://alyra-opensea-clone.vercel.app/
- *Demo* : https://youtu.be/RYO-YtdLG64
- *Testnet* : Rinkeby

| Contract  | Address                                                                                                                       |
|-----------|-------------------------------------------------------------------------------------------------------------------------------|
| NFTMarketplace | [0xD9424A8A924D4813A3F35F2E86D6E85A4585661e](https://rinkeby.etherscan.io/address/0xD9424A8A924D4813A3F35F2E86D6E85A4585661e) |
| NFTCollectionFactory | [0x3a91C8e598e20F0A8c4959c3bCa411d365df8325](https://rinkeby.etherscan.io/address/0x3a91C8e598e20F0A8c4959c3bCa411d365df8325) |
| NFTMinter | [0x0212605a96cAf06A95658FeA56851FcE8e48B787](https://rinkeby.etherscan.io/address/0x0212605a96cAf06A95658FeA56851FcE8e48B787) |

## Stack
- Ethereum in memory blockchain, Ganache Version 2.5.4 (GUI or CLI)
- Truffle v5.4.18 (core: 5.4.18)
- Solidity v0.8.14 (solc-js)
- Node v15.5.0
- Vue 3 (View library)
- Pinia (state management)
- Tailwind (CSS framework)
- Vite (bundler)

## Minimum technical specifications

- The NFTs will use the classic OpenZeppelin standard implementations
- You will have to upload the metadatas and files on IPFS
- Users must be able to see the nft for sale and the NFTs owned
- NFT collections will be created by an NFT factory (using or not OpenZeppelin)
- Users will have a page to create these collections / nft in a collection
- In a contract, we bind to a user the collections of NFTs created / in which he has a balance.
- The UI is made on the platform you want
- The NFTs have a gross purchase price in ETH

## Setup

3 fake collections of NFTs have been created in order to easily develop the project (acting as "fixtures").
To launch the application you just have to execute the following commands:

```
make install
make boot-ganache
make run
```
