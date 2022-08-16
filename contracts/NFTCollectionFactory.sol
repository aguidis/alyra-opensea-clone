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
     */
    function createNFTCollection(
        string memory _nftName,
        string memory _nftSymbol,
        string memory _nftDescription,
        string memory _nftAuthorName
    ) external {
        bytes32 salt = keccak256(abi.encodePacked(_nftName, _nftSymbol));
        UpgradableGenericNFT token = new UpgradableGenericNFT{salt: salt}(); // Use create2

        // Initialize the collection contract with the nft settings
        token.initialize(_nftName, _nftSymbol);

        // Store collection author
        ownerCollections[msg.sender][ownerBalance[msg.sender]] = address(token);
        ownerBalance[msg.sender] += 1;

        // Add new collection to the marketplace
        NFTMarketplace marketplace = NFTMarketplace(marketplaceAddress);
        marketplace.addCollection(_nftName, _nftDescription, address(token), _nftAuthorName);

        emit NFTCollectionCreated(_nftName, address(token), block.timestamp);
    }

    /*
     * @notice Returns count of created NFT collection for a specific account
     */
    function getOwnerBalance(address ownerAddress) external view returns (uint) {
        return ownerBalance[ownerAddress];
    }

    /*
     * @notice Returns collection address at index for current account
     */
    function getOwnerCollectionByIndex(address ownerAddress, uint index) external view returns (address) {
        return ownerCollections[ownerAddress][index];
    }
}
