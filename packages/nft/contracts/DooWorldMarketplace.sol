// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract DooWorldMarketplace is IERC721Receiver {
    uint256 gasFee = 0.00025 ether;
    address payable owner;

    struct MarketItem {
        address payable seller;
        uint256 price;
        bool sale;
    }

    struct AuctionDetail {
        address seller;
        uint256 price;
        uint256 duration;
        uint256 maxBid;
        address maxBidUser;
        bool isActive;
        uint256[] bidAmounts;
        address[] users;
    }

    mapping(address => mapping(uint256 => MarketItem)) public MarketItems;

    mapping(address => mapping(uint256 => AuctionDetail)) public AutionDetails;

    mapping(address => mapping(uint256 => mapping(address => uint256)))
        public bids;

    /* Logging event */
    event Logger(
        address indexed nftContract,
        uint256 indexed tokenId,
        string[2] logType,
        address from,
        address to,
        uint256 price,
        uint256 gasFee,
        uint256 enteredQuantity
    );

    constructor(address _address) {
        owner = payable(_address);
    }

    /* ADMIN FUNCTIONALITES */

    /* Updates the listing price of the contract */
    function updateGasFee(uint256 _gasFee) public payable {
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

    /* USER BUY/SELL/TRANSFER FUNCTIONALIES */

    /* Create New Market Item */
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable {
        address _owner = IERC721(nftContract).ownerOf(tokenId);
        require(_owner == msg.sender, "Not a owner of this token");
        require(price > 0, "Price must be greater than gas Fee");
        require(msg.value >= gasFee, "Price must be equal to Gas Fee");
        MarketItems[nftContract][tokenId] = MarketItem(
            payable(msg.sender),
            price,
            true
        );
        IERC721(nftContract).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId
        );
        payable(owner).transfer(gasFee);
        emit Logger(
            nftContract,
            tokenId,
            ["Market Items Register", ""],
            msg.sender,
            address(this),
            price,
            gasFee,
            msg.value
        );
    }

    /* Set Ready for sale and Cancel */
    function toggleSale(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external {
        MarketItem storage item = MarketItems[nftContract][tokenId];
        address _owner = IERC721(nftContract).ownerOf(tokenId);
        if (item.sale) {
            require(_owner == address(this), "Not a owner of this token");
            item.sale = false;
            IERC721(nftContract).safeTransferFrom(
                address(this),
                msg.sender,
                tokenId
            );
            emit Logger(
                nftContract,
                tokenId,
                ["Sale Cancel", ""],
                address(this),
                msg.sender,
                price,
                0,
                0
            );
        } else {
            require(_owner == msg.sender, "Not a owner of this token");
            item.sale = true;
            item.price = price;
            IERC721(nftContract).safeTransferFrom(
                msg.sender,
                address(this),
                tokenId
            );
            emit Logger(
                nftContract,
                tokenId,
                ["Sale Init", ""],
                msg.sender,
                address(this),
                price,
                0,
                0
            );
        }
    }

    /* Buy token */
    function buy(address nftContract, uint256 tokenId) public payable {
        // require(_exists(itemId), "Token doesn't exists");
        AuctionDetail storage auction = AutionDetails[nftContract][tokenId];
        MarketItem storage item = MarketItems[nftContract][tokenId];
        address tokenOwner = IERC721(nftContract).ownerOf(tokenId);
        require(tokenOwner != msg.sender, "Already hanve this token");
        uint256 price = item.price + gasFee;
        address payable seller = item.seller;
        require(item.sale, "It's not ready for sale");
        require(
            msg.value >= price,
            "Please submit the asking price in order to complete the purchase"
        );
        IERC721(nftContract).safeTransferFrom(tokenOwner, msg.sender, tokenId);
        payable(seller).transfer(item.price);
        payable(owner).transfer(gasFee);
        item.seller = payable(msg.sender);
        auction.seller = payable(msg.sender);
        item.sale = false;
        emit Logger(
            nftContract,
            tokenId,
            ["sell", "buy"],
            seller,
            msg.sender,
            item.price,
            gasFee,
            msg.value
        );
    }

    /* Transfer token to address */
    function transferToken(
        address nftContract,
        address to,
        uint256 tokenId,
        bool fee
    ) public payable {
        AuctionDetail storage auction = AutionDetails[nftContract][tokenId];
        MarketItem storage item = MarketItems[nftContract][tokenId];
        address _owner = IERC721(nftContract).ownerOf(tokenId);
        require(msg.sender == _owner, "Not a owner of this token");
        if (fee) {
            require(
                msg.value >= gasFee,
                "Please sumbit GasFee to transfer token"
            );
            payable(owner).transfer(gasFee);
        }
        IERC721(nftContract).safeTransferFrom(msg.sender, to, tokenId);
        item.seller = payable(to);
        auction.seller = payable(to);
        emit Logger(
            nftContract,
            tokenId,
            ["transfer", ""],
            msg.sender,
            to,
            0,
            fee ? gasFee : 0,
            msg.value
        );
    }

    /* Get Market Item Details */
    function getTokenMarketItemDetails(
        address nftContract,
        uint256 tokenId
    ) public view returns (MarketItem memory) {
        MarketItem memory item = MarketItems[nftContract][tokenId];
        return item;
    }

    /* AUCTION FUNTIONALITIES */

    /* Start Auction */
    function startAuction(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 duration
    ) external payable {
        require(msg.sender != address(0), "Invalid Address");
        require(nftContract != address(0), "Invalid Account");
        require(price > 0, "Price shold be more than 0");
        require(duration > 0, "Invalid duration value");
        AuctionDetail memory _auction = AuctionDetail(
            msg.sender,
            price,
            duration,
            0,
            address(0),
            true,
            new uint256[](0),
            new address[](0)
        );
        address _owner = msg.sender;
        ERC721(nftContract).safeTransferFrom(_owner, address(this), tokenId);
        AutionDetails[nftContract][tokenId] = _auction;
        payable(owner).transfer(gasFee);
        emit Logger(
            nftContract,
            tokenId,
            ["start auction", ""],
            msg.sender,
            address(this),
            price,
            gasFee,
            msg.value
        );
    }

    /* Place a bid */
    function bid(address nftContract, uint256 tokenId) external payable {
        AuctionDetail storage auction = AutionDetails[nftContract][tokenId];
        require(
            msg.value >= auction.price,
            "Bid price is less than current price"
        );
        require(auction.isActive, "Auction not active");
        require(auction.duration > block.timestamp, "Deadline already passed");
        if (bids[nftContract][tokenId][msg.sender] > 0) {
            (bool success, ) = msg.sender.call{
                value: bids[nftContract][tokenId][msg.sender]
            }("");
            require(success);
            emit Logger(
                nftContract,
                tokenId,
                ["refund", ""],
                address(this),
                msg.sender,
                bids[nftContract][tokenId][msg.sender],
                0,
                msg.value
            );
            bids[nftContract][tokenId][msg.sender] = 0;
            for (uint256 i = 0; i < auction.users.length; i++) {
                if (auction.users[i] == msg.sender) {
                    auction.bidAmounts[i] = 0;
                }
            }
        }
        bids[nftContract][tokenId][msg.sender] = msg.value;
        if (auction.bidAmounts.length == 0) {
            auction.maxBid = msg.value;
            auction.maxBidUser = msg.sender;
        } else {
            uint256 lastIndex = auction.bidAmounts.length - 1;
            require(
                auction.bidAmounts[lastIndex] < msg.value,
                "Current max bid is higher than your bid"
            );
            auction.maxBid = msg.value;
            auction.maxBidUser = msg.sender;
        }
        auction.users.push(msg.sender);
        auction.bidAmounts.push(msg.value);
        emit Logger(
            nftContract,
            tokenId,
            ["bid", "incoming bid"],
            msg.sender,
            auction.seller,
            msg.value,
            0,
            msg.value
        );
    }

    /* Execute Auction */
    function executeSale(address nftContract, uint256 tokenId) external {
        AuctionDetail storage auction = AutionDetails[nftContract][tokenId];
        MarketItem storage item = MarketItems[nftContract][tokenId];
        require(
            auction.duration <= block.timestamp,
            "Deadline did not pass yet"
        );
        require(auction.seller == msg.sender, "Not seller");
        require(auction.isActive, "auction not active");
        auction.isActive = false;
        if (auction.bidAmounts.length == 0) {
            ERC721(nftContract).safeTransferFrom(
                address(this),
                auction.seller,
                tokenId
            );
            emit Logger(
                nftContract,
                tokenId,
                ["return auction", ""],
                address(this),
                msg.sender,
                auction.price,
                0,
                0
            );
        } else {
            (bool success, ) = auction.seller.call{value: auction.maxBid}("");
            require(success);
            for (uint256 i = 0; i < auction.users.length; i++) {
                if (
                    auction.users[i] != auction.maxBidUser &&
                    auction.bidAmounts[i] > 0
                ) {
                    (success, ) = auction.users[i].call{
                        value: bids[nftContract][tokenId][auction.users[i]]
                    }("");
                    require(success);
                    emit Logger(
                        nftContract,
                        tokenId,
                        ["refund", ""],
                        address(this),
                        auction.users[i],
                        bids[nftContract][tokenId][auction.users[i]],
                        0,
                        0
                    );
                    bids[nftContract][tokenId][auction.users[i]] = 0;
                }
            }
            ERC721(nftContract).safeTransferFrom(
                address(this),
                auction.maxBidUser,
                tokenId
            );
            auction.seller = payable(auction.maxBidUser);
            item.seller = payable(auction.maxBidUser);
            emit Logger(
                nftContract,
                tokenId,
                ["execute auction", ""],
                msg.sender,
                auction.maxBidUser,
                auction.maxBid,
                0,
                0
            );
        }
    }

    /* Cancel Auction */
    function cancelAuction(address nftContract, uint256 tokenId) external {
        AuctionDetail storage auction = AutionDetails[nftContract][tokenId];
        require(auction.seller == msg.sender, "Not seller");
        require(auction.isActive, "auction not active");
        auction.isActive = false;
        bool success;
        for (uint256 i = 0; i < auction.users.length; i++) {
            if (auction.bidAmounts[i] > 0) {
                (success, ) = auction.users[i].call{
                    value: bids[nftContract][tokenId][auction.users[i]]
                }("");
                require(success);
                emit Logger(
                    nftContract,
                    tokenId,
                    ["refund", ""],
                    address(this),
                    auction.users[i],
                    bids[nftContract][tokenId][auction.users[i]],
                    0,
                    0
                );
                bids[nftContract][tokenId][auction.users[i]] = 0;
            }
        }
        ERC721(nftContract).safeTransferFrom(
            address(this),
            auction.seller,
            tokenId
        );
        emit Logger(
            nftContract,
            tokenId,
            ["cancel auction", ""],
            address(this),
            msg.sender,
            auction.price,
            0,
            0
        );
    }

    /* Get Auction Details */
    function getTokenAuctionDetails(
        address nftContract,
        uint256 tokenId
    ) public view returns (AuctionDetail memory) {
        AuctionDetail memory auction = AutionDetails[nftContract][tokenId];
        return auction;
    }

    /* ERC721 RECEIVER */

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
    }

    receive() external payable {}
}
