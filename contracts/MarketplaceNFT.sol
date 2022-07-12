// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error CollectionAlreadyRegistered(address nftAddress);
error AlreadyListed(address nftAddress, uint256 tokenId);
error NotListed(address nftAddress, uint256 tokenId);
error PriceMustBeAboveZero();
error PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);
error NoProceeds();
error NotApprovedForMarketplace();
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

    //////////////////////////
    // Modifiers Functions //
    /////////////////////////

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
     * @notice Method for listing NFT
     *
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     * @param price sale price for the token
     *
     * @dev We approve the marketplace to operate it on behalf of the owner and then the owner lists it on the marketplace.
     */
    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    )
    external
    notListed(nftAddress, tokenId, msg.sender)
    isOwner(nftAddress, tokenId, msg.sender)
    {
        if (price <= 0) {
            revert PriceMustBeAboveZero();
        }

        IERC721 nft = IERC721(nftAddress);

        if (nft.getApproved(tokenId) != address(this)) {
            revert NotApprovedForMarketplace();
        }

        listings[nftAddress][tokenId] = Listing(price, msg.sender);

        emit ItemListed(tokenId, nftAddress, msg.sender, price);
    }

    /*
     * @notice Method for cancelling listing
     *
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     */
    function cancelListing(address nftAddress, uint256 tokenId)
    external
    isOwner(nftAddress, tokenId, msg.sender)
    isListed(nftAddress, tokenId)
    {
        delete (listings[nftAddress][tokenId]);
        emit ItemCanceled(tokenId, nftAddress, msg.sender);
    }

    /*
     * @notice Method for buying a listed token
     *
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     *
     * @dev The owner of an NFT could unapproved the marketplace, which would cause this function to fail.
     * @dev Check https://fravoll.github.io/solidity-patterns/pull_over_push.html
     */
    function buyItem(address nftAddress, uint256 tokenId)
    external
    payable
    isListed(nftAddress, tokenId)
    nonReentrant
    {
        Listing memory listedItem = listings[nftAddress][tokenId];

        if (msg.value < listedItem.price) {
            revert PriceNotMet(nftAddress, tokenId, listedItem.price);
        }

        profits[listedItem.seller] += msg.value;
        // Could just send the money...
        // https://fravoll.github.io/solidity-patterns/pull_over_push.html
        delete (listings[nftAddress][tokenId]);

        IERC721(nftAddress).safeTransferFrom(listedItem.seller, msg.sender, tokenId);

        emit ItemBought(tokenId, nftAddress, msg.sender, listedItem.price);
    }

    /*
     * @notice Method for updating listing
     *
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     * @param newPrice Price in Wei of the item
     */
    function updateListing(
        address nftAddress,
        uint256 tokenId,
        uint256 newPrice
    )
    external
    isListed(nftAddress, tokenId)
    nonReentrant
    isOwner(nftAddress, tokenId, msg.sender)
    {
        listings[nftAddress][tokenId].price = newPrice;
        emit ItemListed(tokenId, nftAddress, msg.sender, newPrice);
    }

    /*
     * @notice Method for withdrawing proceeds from sales
     */
    function withdrawProceeds() external {
        uint256 proceeds = profits[msg.sender];

        if (proceeds <= 0) {
            revert NoProceeds();
        }

        profits[msg.sender] = 0;

        (bool success,) = payable(msg.sender).call{value : proceeds}("");

        require(success, "Transfer failed");
    }

    /*
     * @notice Method for registering an NFT collection
     *
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


    //////////////////////
    // Getter Functions //
    //////////////////////

    /*
     * @notice Returns all listing for a given token
     */
    function getListing(address nftAddress, uint256 tokenId)
    external
    view
    returns (Listing memory)
    {
        return listings[nftAddress][tokenId];
    }

    /*
     * @notice Returns all proceeds for a given address
     */
    function getProceeds(address seller) external view returns (uint256) {
        return profits[seller];
    }

    /*
     * @notice Returns count of registered NFT collection
     */
    function getCollectionCount() external view returns (uint count) {
        return collectionIndex.length;
    }

    /*
     * @notice Returns the desired NFT collection metadata by index
     */
    function getCollectionAtIndex(uint index)
    external
    view
    returns (Collection memory)
    {
        address contractAddress = collectionIndex[index];

        return collections[contractAddress];
    }

    /*
     * @notice Returns the desired NFT collection metadata by index
     */
    function getCollectionByAddress(address contractAddress)
    external
    view
    returns (Collection memory)
    {
        return collections[contractAddress];
    }
}
