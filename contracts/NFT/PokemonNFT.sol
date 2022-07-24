// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "./GenericNFT.sol";

contract PokemonNFT is GenericNFT {
    constructor() GenericNFT("PokemonNFT", "PokeNFT") {}
}
