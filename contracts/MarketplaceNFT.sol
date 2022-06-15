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

    event CollectionRegistered(
        address indexed from,
        address indexed nftAddress
    );
    
    event ItemListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemCanceled(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId
    );

    event ItemBought(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    /// @notice NFT address -> registration lag
    mapping(address => bool) private registeredCollections;
    /// @notice NFT address -> Token ID -> Listing
    mapping(address => mapping(uint256 => Listing)) private listings;
    /// @notice Seller address -> ETH amount from sales
    mapping(address => uint256) private profits;

    modifier notRegistered(
        address nftAddress
    ) {
        bool isRegistered = registeredCollections[nftAddress];
        if (isRegistered) {
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
     * @param nftAddress Address of NFT contract
     */
    function addCollections(address nftAddress) public notRegistered(nftAddress) {
        registeredCollections[nftAddress] = true;

        emit CollectionRegistered(msg.sender, nftAddress);
    }
}
