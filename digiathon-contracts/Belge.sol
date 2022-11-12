//SPDX-License-Identifier: None
pragma solidity 0.8.17;

interface NoterKayit {
    function noterDahil(address[] calldata) external returns (bool);

    function noterMi(address) external returns (bool);
}

contract Belge {
    struct BireyselBelge {
        uint256 zamanDamgasi;
        address[] imzalayanlar;
        bool imzaliMi;
    }

    struct Antlasma {
        uint256 zamanDamgasi;
        address[] imzalayanlar;
        address[] taraflar;
        bool imzaliMi;
    }

    uint256 antlasmaSayisi;
    uint256 belgeSayisi;

    mapping(bytes => BireyselBelge) public bireyselBelgeler;
    mapping(bytes => Antlasma) public antlasmalar;
    mapping(address => uint256[]) public adresinBelgeleri;

    NoterKayit public noterKayit;

    constructor(address noterKayitAdresi) {
        noterKayit = NoterKayit(noterKayitAdresi);
    }

    function bireyselBelgeOlustur(bytes calldata _belgeHashi) external {
        address[] memory _imzalayanlar;
        bireyselBelgeler[_belgeHashi] = BireyselBelge(
            block.timestamp,
            _imzalayanlar,
            false
        );
    }

    function antlasmaOlustur(
        bytes calldata _belgeHashi,
        address[] calldata _taraflar
    ) external {
        address[] memory _imzalayanlar;
        antlasmalar[_belgeHashi] = Antlasma(
            block.timestamp,
            _imzalayanlar,
            _taraflar,
            false
        );
    }

    function noterOlarakImzala(
        bytes calldata _belgeHashi,
        bool _antlasmaVeyaBelge
    ) external {
        require(noterKayit.noterMi(msg.sender), "Bu adres noter degildir");
        if (_antlasmaVeyaBelge) {
            require(
                antlasmalar[_belgeHashi].imzaliMi,
                "Bu belge zaten noter tarafindan imzalanmistir"
            );
            antlasmalar[_belgeHashi].imzalayanlar.push(msg.sender);
            antlasmalar[_belgeHashi].imzaliMi = true;
        } else {
            require(
                bireyselBelgeler[_belgeHashi].imzaliMi,
                "Bu belge zaten noter tarafindan imzalanmistir"
            );
            bireyselBelgeler[_belgeHashi].imzalayanlar.push(msg.sender);
            bireyselBelgeler[_belgeHashi].imzaliMi = true;
        }
    }
}
