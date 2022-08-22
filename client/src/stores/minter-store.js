import { defineStore, storeToRefs } from 'pinia';
import { ethers } from 'ethers';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { DEFAULT_NETWORK } from '../constants/blockchain';
import { getNetworkParams } from '../helpers/network-params';
import { useWalletStore } from './wallet-store';
import NFTMarketplace from '../contracts/NFTMarketplace.json';
import NFTMinter from '../contracts/NFTMinter.json';
import UpgradableGenericNFT from '../contracts/UpgradableGenericNFT.json';
import GenericNFT from '../contracts/GenericNFT.json';

const readOnlyProvider = new StaticJsonRpcProvider(getNetworkParams().rpcUrls[0]);
const signer = readOnlyProvider.getSigner();

const minterNetwork = NFTMinter.networks[DEFAULT_NETWORK];
const readOnlyNFTMinterContract = new ethers.Contract(minterNetwork.address, NFTMinter.abi, signer);

const marketplaceNetwork = NFTMarketplace.networks[DEFAULT_NETWORK];
const readOnlyMarketplaceContract = new ethers.Contract(marketplaceNetwork.address, NFTMarketplace.abi, signer);

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

                console.log('account', address.value);
                console.log('contract', contractAddress);

                const minterContract = new ethers.Contract(contractAddress, contractAbi, signer);

                const tx = await minterContract.safeMint(address.value, metadataUri);

                // Wait for the transaction to be confirmed, then get the token ID out of the emitted Transfer event.
                const receipt = await tx.wait();

                console.log('receipt', receipt);
                console.log('receipt', receipt.events);

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

                console.log('token', {
                    id: tokenId,
                    ...token,
                    tokenMetadata: metadataUrl,
                    address: contractAddress
                });

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
        async fetchCreatedTokens() {
            this.loading = true;

            try {
                const { address } = storeToRefs(useWalletStore());

                let tokenPromises = [];

                const balance = await readOnlyNFTMinterContract.balanceOf(address.value);

                const balanceInt = parseInt(balance.toString(), 10);
                const minterOwnedTokensPromises = [...Array(balanceInt).keys()].map((y) => {
                    let currentTokenId;
                    let currentTokenMetadata;

                    return readOnlyNFTMinterContract
                        .tokenOfOwnerByIndex(address.value, y)
                        .then((tokenId) => {
                            currentTokenId = tokenId;
                            return readOnlyNFTMinterContract.tokenURI(tokenId);
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

                // TODO
                // Créer une methode similaire dans le factory store


                tokenPromises = [...tokenPromises, ...minterOwnedTokensPromises];

                Promise.all(tokenPromises).then((values) => {
                    this.createdTokens = values;
                    this.loading = false;
                });
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    }
});
