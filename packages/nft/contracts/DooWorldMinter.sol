// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DooWorldMinter is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address payable owner;
    uint256 gasFee = 0.00025 ether;

    constructor(address _address) ERC721("DooWorldMinter", "PYRA") {
        owner = payable(_address);
    }

    /* Updates the listing price of the contract */
    function updateGasFee(uint256 _gasFee) public {
        require(
            owner == msg.sender,
            "Only marketplace owner can update listing price."
        );
        gasFee = _gasFee;
    }

    /* Returns the listing price of the contract */
    function getGasFee() public view returns (uint256) {
        return gasFee;
    }

    /* Mints a token and lists it in the marketplace */
    function createToken(string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        payable(owner).transfer(gasFee);
        return newTokenId;
    }

    /* Returns all available Tokens */
    function getTotalTokens() public view returns (uint256) {
        require(msg.sender == owner, "It's not a Admin");
        uint256 totalItems = _tokenIds.current();
        return totalItems;
    }
}
