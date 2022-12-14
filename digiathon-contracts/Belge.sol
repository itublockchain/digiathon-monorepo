//SPDX-License-Identifier: None
pragma solidity 0.8.17;

interface NoterKayit {
    function noterDahil(address[] calldata) external returns (bool);

    function noterMi(address) external returns (bool);
}

contract Belge {
    event BireyselBelgeNoterTarafindanImzanlandi(bytes belgeHashi);
    event AntlasmaNoterTarafindanImzalandi(bytes belgeHashi);
    event AntlasmaTumTaraflarTarafindanImzalandi(bytes belgeHashi);

    struct BireyselBelge {
        uint256 zamanDamgasi;
        address imzalayanNoter;
        bool imzalandiMi;
    }

    struct Antlasma {
        uint256 zamanDamgasi;
        address[] imzalayanlar;
        address[] taraflar;
        bool imzalandiMi;
    }

    mapping(bytes => BireyselBelge) public bireyselBelgeler;
    mapping(bytes => Antlasma) public antlasmalar;
    mapping(address => bytes[]) public adresinBelgeleri;
    mapping(address => mapping(bytes => bool)) public imzalananBelgeler;
    mapping(address => mapping(bytes => bool)) public imzalanabilirBelgeler;
    mapping(bytes => uint256) public hangiBelgeTuru; //0 = tanimsiz, 1 = belge, 2 = antlasma

    NoterKayit public noterKayit;

    constructor(address noterKayitAdresi) {
        noterKayit = NoterKayit(noterKayitAdresi);
    }

    function bireyselBelgeOlustur(bytes calldata _belgeHashi) external {
        BireyselBelge memory belge;
        belge.zamanDamgasi = block.timestamp;
        bireyselBelgeler[_belgeHashi] = belge;
        hangiBelgeTuru[_belgeHashi] = 1;
        imzalanabilirBelgeler[msg.sender][_belgeHashi] = true;
    }

    function antlasmaOlustur(
        bytes calldata _belgeHashi,
        address[] calldata _taraflar
    ) external {
        Antlasma memory _antlasma;
        _antlasma.taraflar = _taraflar;
        _antlasma.zamanDamgasi = block.timestamp;
        antlasmalar[_belgeHashi] = _antlasma;
        for (uint256 i = 0; i < _taraflar.length; i++) {
            imzalanabilirBelgeler[_taraflar[i]][_belgeHashi] = true;
        }
        hangiBelgeTuru[_belgeHashi] = 2;
    }

    function noterOlarakImzala(bytes calldata _belgeHashi) external {
        require(noterKayit.noterMi(msg.sender), "Bu adres noter degildir");
        require(hangiBelgeTuru[_belgeHashi] != 0, "Gecersiz belge");
        if (hangiBelgeTuru[_belgeHashi] == 2) {
            require(
                antlasmalar[_belgeHashi].imzalandiMi == false,
                "Bu belge zaten noter tarafindan imzalanmistir"
            );
            require(
                antlasmalar[_belgeHashi].taraflar.length ==
                    antlasmalar[_belgeHashi].imzalayanlar.length,
                "Bu belgeyi henuz tum taraflar imzalamadi"
            );
            antlasmalar[_belgeHashi].imzalayanlar.push(msg.sender);
            antlasmalar[_belgeHashi].imzalandiMi = true;
            imzalananBelgeler[msg.sender][_belgeHashi] = true;
        } else if (hangiBelgeTuru[_belgeHashi] == 1) {
            require(
                bireyselBelgeler[_belgeHashi].imzalandiMi == false,
                "Bu belge zaten noter tarafindan imzalanmistir"
            );
            bireyselBelgeler[_belgeHashi].imzalayanNoter = msg.sender;
            bireyselBelgeler[_belgeHashi].imzalandiMi = true;
            imzalananBelgeler[msg.sender][_belgeHashi] = true;
        }
    }

    function bireyOlarakImzala(bytes calldata _belgeHashi) external {
        require(hangiBelgeTuru[_belgeHashi] != 0, "Gecersiz belge");
        require(
            imzalanabilirBelgeler[msg.sender][_belgeHashi],
            "Bu belgeyi imzalayabilmek icin yetkiniz yoktur"
        );
        require(
            imzalananBelgeler[msg.sender][_belgeHashi] == false,
            "Bu belgeyi coktan imzaladiniz"
        );
        if (hangiBelgeTuru[_belgeHashi] == 2) {
            antlasmalar[_belgeHashi].imzalayanlar.push(msg.sender);
        }
        imzalananBelgeler[msg.sender][_belgeHashi] = true;
    }

    function antlasmayiKimImzaladi(bytes calldata _belgeHashi)
        external
        view
        returns (address[] memory)
    {
        return antlasmalar[_belgeHashi].imzalayanlar;
    }
}
