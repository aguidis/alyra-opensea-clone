import { defineStore, storeToRefs } from 'pinia';
import { ethers } from 'ethers';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { DEFAULT_NETWORK } from '../constants/blockchain';
import { getNetworkParams } from '../helpers/network-params';
import { useWalletStore } from './wallet-store';
import NFTMarketplace from '../contracts/NFTMarketplace.json';
import NFTMinter from '../contracts/NFTMinter.json';
import UpgradableGenericNFT from '../contracts/UpgradableGenericNFT.json';
import NFTCollectionFactory from '../contracts/NFTCollectionFactory.json';

const provider = new StaticJsonRpcProvider(getNetworkParams().rpcUrls[0]);

const factoryNetwork = NFTCollectionFactory.networks[DEFAULT_NETWORK];
const readOnlyFactoryContract = new ethers.Contract(factoryNetwork.address, NFTCollectionFactory.abi, provider);

const minterNetwork = NFTMinter.networks[DEFAULT_NETWORK];
const readOnlyMinterContract = new ethers.Contract(minterNetwork.address, NFTMinter.abi, provider);

const marketplaceNetwork = NFTMarketplace.networks[DEFAULT_NETWORK];
const readOnlyMarketplaceContract = new ethers.Contract(marketplaceNetwork.address, NFTMarketplace.abi, provider);

export const useMinterStore = defineStore({
    id: 'minter',
    state: () => ({
        token: null,
        createdTokens: [],
        transactionHash: null,
        loading: false,
        error: null
    }),
    actions: {
        async mint(metadataUri, customCollectionAddress) {
            this.loading = true;

            try {
                const { address } = storeToRefs(useWalletStore());
                const { provider } = useWalletStore();
                const signer = provider.getSigner();

                const contractAddress = customCollectionAddress ? customCollectionAddress : minterNetwork.address;
                let contractAbi = customCollectionAddress ? UpgradableGenericNFT.abi : NFTMinter.abi;

                const minterContract = new ethers.Contract(contractAddress, contractAbi, signer);

                const tx = await minterContract.safeMint(address.value, metadataUri);
                // Wait for the transaction to be confirmed, then get the token ID out of the emitted Transfer event.
                const receipt = await tx.wait();

                let tokenId = null;
                for (const event of receipt.events) {
                    if (event.event !== 'Transfer') {
                        continue;
                    }
                    tokenId = event.args.tokenId.toString();
                    break;
                }

                if (tokenId === null) {
                    throw 'Mint failed';
                }

                const metadataUrl = metadataUri.replace('ipfs://', 'https://nftstorage.link/ipfs/');
                const tokenMetadata = await fetch(metadataUrl);

                const token = await tokenMetadata.json();

                this.token = {
                    id: tokenId,
                    ...token,
                    tokenMetadata: metadataUrl,
                    address: contractAddress
                };
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async fetchCreatedTokens(accountAddress) {
            this.loading = true;

            if (!accountAddress) {
                return;
            }

            if (this.createdTokens.length > 0) {
                this.loading = false;
                return;
            }

            try {
                let tokenPromises = [];

                // There is at least the NFTMinter contract to check
                let nftAddresses = [minterNetwork.address];

                // Then fetch all created collection
                const createdCollectionCount = await readOnlyFactoryContract.getOwnerBalance(accountAddress);
                const createdCollectionBalance = parseInt(createdCollectionCount.toString(), 10);

                const minterOwnerBalance = await readOnlyMinterContract.balanceOf(accountAddress);
                const minterOwnerBalanceInt = parseInt(minterOwnerBalance.toString(), 10);

                if (minterOwnerBalanceInt === 0 && createdCollectionBalance === 0) {
                    this.loading = false;
                    return;
                }

                for (let i = 0; i < createdCollectionBalance; i++) {
                    const collectionAddress = await readOnlyFactoryContract.getOwnerCollectionByIndex(accountAddress, i);
                    nftAddresses.push(collectionAddress);
                }

                // Finally fetch all created tokens
                for (const nftAddress of nftAddresses) {
                    const nftContract = new ethers.Contract(nftAddress, UpgradableGenericNFT.abi, provider);

                    const balance = await nftContract.balanceOf(accountAddress);
                    const balanceInt = parseInt(balance.toString(), 10);

                    const createdTokenPromises = [...Array(balanceInt).keys()].map((y) => {
                        let currentTokenId;
                        let currentTokenMetadata;

                        return nftContract
                            .tokenOfOwnerByIndex(accountAddress, y)
                            .then((tokenId) => {
                                currentTokenId = tokenId;
                                return nftContract.tokenURI(tokenId);
                            })
                            .then((tokenURI) => {
                                const ipfsGateway = tokenURI.replace('ipfs://', 'https://nftstorage.link/ipfs/');
                                return fetch(ipfsGateway).then((metadata) => metadata.json());
                            })
                            .then((metadata) => {
                                currentTokenMetadata = metadata;

                                return readOnlyMarketplaceContract.getListing(minterNetwork.address, currentTokenId);
                            })
                            .then((listing) => {
                                return {
                                    id: currentTokenId.toString(),
                                    ...currentTokenMetadata,
                                    nftAddress: minterNetwork.address,
                                    listing: {
                                        price: parseInt(listing.price.toString(), 10),
                                        seller: listing.seller
                                    }
                                };
                            });
                    });

                    tokenPromises = [...tokenPromises, ...createdTokenPromises];
                }

                Promise.all(tokenPromises).then((values) => {
                    this.createdTokens = values;
                    this.loading = false;
                });
            } catch (error) {
                console.log('error', error);

                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
});
