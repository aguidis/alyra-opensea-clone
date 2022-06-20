// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


    error CollectionAlreadyRegistered(address nftAddress);
    error NotApprovedForMarketplace();
    error AlreadyListed(address nftAddress, uint256 tokenId);
    error NotListed(address nftAddress, uint256 tokenId);
    error PriceMustBeAboveZero();
    error PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);
    error NoProceeds();
    error NotOwner();

contract MarketplaceNFT is ReentrancyGuard {
    struct Listing {
        uint256 price;
        address seller;
    }

    struct Collection {
        string name;
        string description;
        address nftAddress;
        string authorName;
        address authorAddress;
        uint index;
    }

    event CollectionRegistered(
        string indexed name,
        address indexed nftAddress,
        address indexed from
    );

    event ItemListed(
        uint256 indexed tokenId,
        address indexed nftAddress,
        address indexed seller,
        uint256 price
    );

    event ItemCanceled(
        uint256 indexed tokenId,
        address indexed nftAddress,
        address indexed seller
    );

    event ItemBought(
        uint256 indexed tokenId,
        address indexed nftAddress,
        address indexed buyer,
        uint256 price
    );

    address[] private collectionIndex;

    /// @notice NFT address -> Collection
    mapping(address => Collection) private collections;
    /// @notice NFT address -> Token ID -> Listing
    mapping(address => mapping(uint256 => Listing)) private listings;
    /// @notice Seller address -> ETH amount from sales
    mapping(address => uint256) private profits;

    modifier notRegistered(
        address nftAddress
    ) {
        if (collectionIndex.length > 0 && collectionIndex[collections[nftAddress].index] == nftAddress) {
            revert CollectionAlreadyRegistered(nftAddress);
        }
        _;
    }

    modifier notListed(
        address nftAddress,
        uint256 tokenId,
        address owner
    ) {
        Listing memory listing = listings[nftAddress][tokenId];
        if (listing.price > 0) {
            revert AlreadyListed(nftAddress, tokenId);
        }
        _;
    }

    modifier isListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = listings[nftAddress][tokenId];
        if (listing.price <= 0) {
            revert NotListed(nftAddress, tokenId);
        }
        _;
    }

    modifier isOwner(
        address nftAddress,
        uint256 tokenId,
        address spender
    ) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        if (spender != owner) {
            revert NotOwner();
        }
        _;
    }

    /////////////////////
    // Main Functions //
    /////////////////////

    /*
     * @notice Method for registering an NFT collection
     * @param name Name of NFT collection
     * @param description Description of NFT collection
     * @param nftAddress Address of NFT contract
     * @param authorName Author name of NFT collection
     */
    function addCollection(string memory name, string memory description, address nftAddress, string memory authorName) public notRegistered(nftAddress) {
        collectionIndex.push(nftAddress);

        collections[nftAddress].name = name;
        collections[nftAddress].description = description;
        collections[nftAddress].nftAddress = nftAddress;
        collections[nftAddress].authorName = authorName;
        collections[nftAddress].authorAddress = msg.sender;
        collections[nftAddress].index = collectionIndex.length - 1;

        emit CollectionRegistered(name, nftAddress, msg.sender);
    }

    /*
     * @notice Returns count of registered NFT collection
     */
    function getCollectionCount() external view returns (uint count) {
        return collectionIndex.length;
    }

    /*
     * @notice Returns the desired NFT collection metadata
     */
    function getCollectionAtIndex(uint index)
    external
    view
    returns (Collection memory)
    {
        address collectionAddress = collectionIndex[index];

        return collections[collectionAddress];
    }
}
