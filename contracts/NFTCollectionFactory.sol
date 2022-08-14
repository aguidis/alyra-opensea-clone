// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "./NFT/UpgradableGenericNFT.sol";
import "./NFTMarketplace.sol";

contract NFTCollectionFactory {
    event NFTCollectionCreated(string _nftName, address _collectionAddress, uint _timestamp);

    /// @notice Marketplace contract address
    address private marketplaceAddress;

    /// @notice Author address -> collection balance
    mapping(address => uint) private ownerBalance;

    /// @notice Author address -> collection index -> NFT address
    mapping(address => mapping(uint256 => address)) private ownerCollections;

    constructor(address marketplaceContract) {
        marketplaceAddress = marketplaceContract;
    }

    /*
     * @notice Deploy the ERC-721 Collection contract of the nft caller to be able to create NFTs later
     *
     * @return collectionAddress the address of the created collection contract
     */
    function createNFTCollection(
        string memory _nftName,
        string memory _nftSymbol,
        string memory _nftDescription,
        string memory _nftAuthorName
    ) external returns (address collectionAddress) {
        // Import the bytecode of the contract to deploy
        bytes memory collectionBytecode = type(UpgradableGenericNFT).creationCode;
        // Make a random salt based on the nft name
        bytes32 salt = keccak256(abi.encodePacked(_nftName));

        assembly {
            collectionAddress := create2(0, add(collectionBytecode, 0x20), mload(collectionBytecode), salt)
            if iszero(extcodesize(collectionAddress)) {
                // revert if something gone wrong (collectionAddress doesn't contain an address)
                revert(0, 0)
            }
        }
        // Initialize the collection contract with the nft settings
        UpgradableGenericNFT(collectionAddress).initialize(_nftName, _nftSymbol);

        // Store collection author
        ownerCollections[msg.sender][ownerBalance[msg.sender]] = collectionAddress;
        ownerBalance[msg.sender]++;

        // Add new collection to the marketplace
        NFTMarketplace marketplace = NFTMarketplace(marketplaceAddress);
        marketplace.addCollection(_nftName, _nftDescription, collectionAddress, _nftAuthorName);

        emit NFTCollectionCreated(_nftName, collectionAddress, block.timestamp);
    }

    /*
     * @notice Returns count of created NFT collection for a specific account
     */
    function getOwnerBalance() external view returns (uint) {
        return ownerBalance[msg.sender];
    }

    /*
     * @notice Returns collection address at index for current account
     */
    function getOwnerCollectionByIndex(uint index) external view returns (address) {
        return ownerCollections[msg.sender][index];
    }
}
