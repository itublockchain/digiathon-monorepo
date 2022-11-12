//SPDX-License-Identifier: None
pragma solidity 0.8.17;

contract NoterKayit {
    address public yetkili;
    mapping(address => bool) public noterAdresleri;

    modifier sadeceYetkili() {
        require(msg.sender == yetkili, "sadece yetkili");
        _;
    }

    constructor(address _yetkili) {
        yetkili = _yetkili;
    }

    function noterKaydet(address yeniNoter) external sadeceYetkili {
        noterAdresleri[yeniNoter] = true;
    }

    function noterSil(address eskiNoter) external sadeceYetkili {
        noterAdresleri[eskiNoter] = false;
    }
}