//SPDX-License-Identifier: None
pragma solidity 0.8.17;

contract Belge {
    struct BireyselBelge {
        uint256 zamanDamgasi;
        bytes belgeHashi;
        address[] imzalayanlar;
    }

    struct Antlasma {
        uint256 zamanDamgasi;
        bytes belgeHashi;
        address[] imzalayanlar;
        address[] taraflar;
    }

    mapping(uint256 => BireyselBelge) public bireyselBelgeler;
    mapping(uint256 => Antlasma) public antlasmalar;
    mapping(address => uint256[]) public adresinBelgeleri;
}