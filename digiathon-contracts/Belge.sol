//SPDX-License-Identifier: None
pragma solidity 0.8.17;

interface NoterKayit {
    function noterDahil(address[] calldata) external returns (bool);
}

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

    NoterKayit public noterKayit;

    constructor(address noterKayitAdresi) {
        noterKayit = NoterKayit(noterKayitAdresi);
    }

    function bireyselBelgeOlustur() external {}

    function antlasmaOlustur() external {}
}