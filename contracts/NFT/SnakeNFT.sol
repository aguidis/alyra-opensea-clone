// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "./GenericNFT.sol";

contract SnakeNFT is GenericNFT {
    constructor() GenericNFT("MarvelousSnakeNFT", "SnakeNFT") {}
}
