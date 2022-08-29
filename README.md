# PROJET FINAL - Recréer un clone minimaliste de OpenSea

Produire une application décentralisée permettant à des artistes de créer leurs collections de NFT et de les mettre à la vente directe (en ETH).

- *Lien du projet* : soon
- *Vidéo de présentation* : https://youtu.be/RYO-YtdLG64
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

## Spécifications techniques minimales

- Les NFT utiliseront les implémentations classiques des standards d’OpenZeppelin
- Vous devrez uploader les metadatas et fichiers sur IPFS
- Les utilisateurs doivent être capables de voir les nft a la vente et les NFTs possédés
- Les collections de NFTs seront créées par une NFT factory (utilisant ou non openZeppelin)
- Les utilisateurs auront une page de création de ces collections / des nft dans une collection
- Dans un contrat, on lie à un utilisateur les collections de NFTs créées / dans lesquelles il a une balance.
- L’UI est faite sur la plateforme que vous souhaitez
- Les NFT ont un prix d’achat brut en ETH

## Installation du projet en local

Trois collections fictives de NFTs ont été créées dans le but de facilement le développement du projet (faisant office de "fixtures").
Pour lancer l'application il suffit d'exécuter les commandes suivantes :

```
make install
make boot-ganache
make run
```
