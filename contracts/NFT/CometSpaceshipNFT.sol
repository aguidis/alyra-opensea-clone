// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "./GenericNFT.sol";

contract CometSpaceshipNFT is GenericNFT {
    constructor() GenericNFT("CometSpaceshipNFT", "CometNFT") {}
}
