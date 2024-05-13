import { BigNumber, Contract } from "ethers";
import { ethers, waffle } from "hardhat";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("DooWorldMarketplace Buy/Sell Concept", () => {
  let NFT,
    nft: Contract,
    NFTMarketplace,
    nftMarketplace: Contract,
    listingPrice: string | number,
    newListingPrice: string | number | BigNumber,
    salePrice: string | number | BigNumber,
    salePrice1: string | number | BigNumber,
    salePrice2: string | number | BigNumber,
    salePrice3: string | number | BigNumber,
    salePrice4: string | number | BigNumber,
    userAddress1: any,
    userAddress2: any,
    userAddress3: any,
    userAddress4: any,
    userAddress5: any,
    provider = waffle.provider;

  before(async () => {
    const [
      _userAddress1,
      _userAddress2,
      _userAddress3,
      _userAddress4,
      _userAddress5,
    ] = await ethers.getSigners();
    userAddress1 = _userAddress1;
    userAddress2 = _userAddress2;
    userAddress3 = _userAddress3;
    userAddress4 = _userAddress4;
    userAddress5 = _userAddress5;
    /* deploy the marketplace */
    NFTMarketplace = await ethers.getContractFactory("DooWorldMarketplace");
    nftMarketplace = await NFTMarketplace.deploy(userAddress1.getAddress());
    await nftMarketplace.deployed();
    NFT = await ethers.getContractFactory("DooWorldMinter");
    nft = await NFT.deploy(_userAddress1.getAddress());
    await nft.deployed();
    console.log("DooWorldMinter deployed to:", nft.address);
    console.log("DooWorldMarketplace deployed to:", nftMarketplace.address);
    listingPrice = await nftMarketplace.getGasFee();
    listingPrice = listingPrice.toString();
    salePrice = ethers.utils.parseUnits("3", "ether");
    salePrice1 = ethers.utils.parseUnits("3", "ether");
    salePrice2 = ethers.utils.parseUnits("4", "ether");
    salePrice3 = ethers.utils.parseUnits("4.5", "ether");
    salePrice4 = ethers.utils.parseUnits("5", "ether");
    newListingPrice = ethers.utils.parseUnits("0.01", "ether");
    // Set Approval for DooWorldMarketplace contract to access tokens from DooWorldMinter
    await nft.setApprovalForAll(nftMarketplace.address, true);
    await nft
      .connect(userAddress2)
      .setApprovalForAll(nftMarketplace.address, true);
    await nft
      .connect(userAddress3)
      .setApprovalForAll(nftMarketplace.address, true);
  });

  it("Create Token in DooWorldMinter contract", async function () {
    /* USER 1 TOKENS = [a,b] */
    await nft.createToken("a", { value: listingPrice });
    await nft.createToken("b", { value: listingPrice });
    /* USER 2 TOKENs = [c,d] */
    await nft.connect(userAddress2).createToken("c", { value: listingPrice });
    await nft.connect(userAddress2).createToken("d", { value: listingPrice });
    let itemCount = await nft.connect(userAddress1).getTotalTokens();
    let items = await Promise.all(
      new Array(itemCount).fill(undefined).map(async (_: any, i: number) => {
        const tokenURI = await nft.tokenURI(i + 1);
        const owner = await nft.ownerOf(i + 1);
        const item = {
          tokenId: i + 1,
          owner,
          tokenURI,
        };
        return item;
      })
    );
    console.log(items);
  });

  it("Create market Items from other contract", async function () {
    const auctionPrice = ethers.utils.parseUnits("1", "ether");
    await nftMarketplace.createMarketItem(nft.address, 1, auctionPrice, {
      value: listingPrice,
    });
    await nftMarketplace
      .getTokenMarketItemDetails(nft.address, 1)
      .then(console.log);
    await nftMarketplace.createMarketItem(nft.address, 2, auctionPrice, {
      value: listingPrice,
    });
    await nftMarketplace
      .getTokenMarketItemDetails(nft.address, 2)
      .then(console.log);
    await nftMarketplace
      .connect(userAddress2)
      .createMarketItem(nft.address, 3, auctionPrice, {
        value: listingPrice,
      });
    await nftMarketplace
      .getTokenMarketItemDetails(nft.address, 3)
      .then(console.log);
    await nftMarketplace
      .connect(userAddress2)
      .createMarketItem(nft.address, 4, auctionPrice, {
        value: listingPrice,
      });
    await nftMarketplace
      .getTokenMarketItemDetails(nft.address, 4)
      .then(console.log);
  });

  it("Change Price for Token", async function () {
    /* Cancel Market Sale and Change Price by user */
    await nftMarketplace.toggleSale(nft.address, 1, salePrice);
    await nftMarketplace
      .getTokenMarketItemDetails(nft.address, 1)
      .then(console.log);
  });

  it("Make and Cancel Market Items", async function () {
    await nftMarketplace.toggleSale(nft.address, 1, salePrice);
    await nftMarketplace
      .getTokenMarketItemDetails(nft.address, 1)
      .then(console.log);
    await nftMarketplace.toggleSale(nft.address, 2, salePrice1);
    await nftMarketplace
      .getTokenMarketItemDetails(nft.address, 2)
      .then(console.log);
  });

  it("Buy Token", async function () {
    await nftMarketplace
      .connect(userAddress2)
      .buy(nft.address, 1, { value: (+salePrice + +listingPrice).toString() });
    await nftMarketplace
      .getTokenMarketItemDetails(nft.address, 1)
      .then(console.log);
  });

  it("Re Buy Token", async function () {
    await nftMarketplace
      .connect(userAddress2)
      .toggleSale(nft.address, 1, salePrice2);
    await nftMarketplace.buy(nft.address, 1, {
      value: (+salePrice2 + +listingPrice).toString(),
    });
    await nftMarketplace
      .getTokenMarketItemDetails(nft.address, 1)
      .then(console.log);
  });

  it("Transfer Token", async function () {
    await nftMarketplace.transferToken(
      nft.address,
      userAddress2.getAddress(),
      2,
      true,
      {
        value: listingPrice,
      }
    );
    await nftMarketplace
      .getTokenMarketItemDetails(nft.address, 2)
      .then(console.log);
  });

  it("Auction flow", async function () {
    const duration = Math.floor(new Date().getTime() / 1000) + 60;
    const auctionPrice = ethers.utils.parseUnits("1", "ether");
    await nftMarketplace.startAuction(nft.address, 1, auctionPrice, duration, {
      value: listingPrice,
    });
    console.log(
      "Before Execution of Auction",
      ethers.utils.formatEther(
        await provider.getBalance(nftMarketplace.address)
      ),
      ethers.utils.formatEther(await userAddress1.getBalance()),
      ethers.utils.formatEther(await userAddress2.getBalance()),
      ethers.utils.formatEther(await userAddress3.getBalance()),
      ethers.utils.formatEther(await userAddress4.getBalance()),
      ethers.utils.formatEther(await userAddress5.getBalance())
    );
    await nftMarketplace.connect(userAddress2).bid(nft.address, 1, {
      value: salePrice1,
    });
    console.log(
      "USER 2 place bid",
      ethers.utils.formatEther(
        await provider.getBalance(nftMarketplace.address)
      ),
      ethers.utils.formatEther(await userAddress1.getBalance()),
      ethers.utils.formatEther(await userAddress2.getBalance()),
      ethers.utils.formatEther(await userAddress3.getBalance()),
      ethers.utils.formatEther(await userAddress4.getBalance()),
      ethers.utils.formatEther(await userAddress5.getBalance())
    );
    await nftMarketplace.connect(userAddress3).bid(nft.address, 1, {
      value: salePrice2,
    });
    console.log(
      "USER 3 place bid",
      ethers.utils.formatEther(
        await provider.getBalance(nftMarketplace.address)
      ),
      ethers.utils.formatEther(await userAddress1.getBalance()),
      ethers.utils.formatEther(await userAddress2.getBalance()),
      ethers.utils.formatEther(await userAddress3.getBalance()),
      ethers.utils.formatEther(await userAddress4.getBalance()),
      ethers.utils.formatEther(await userAddress5.getBalance())
    );
    await nftMarketplace.connect(userAddress3).bid(nft.address, 1, {
      value: salePrice3,
    });
    console.log(
      "USER 4 place bid",
      ethers.utils.formatEther(
        await provider.getBalance(nftMarketplace.address)
      ),
      ethers.utils.formatEther(await userAddress1.getBalance()),
      ethers.utils.formatEther(await userAddress2.getBalance()),
      ethers.utils.formatEther(await userAddress3.getBalance()),
      ethers.utils.formatEther(await userAddress4.getBalance()),
      ethers.utils.formatEther(await userAddress5.getBalance())
    );
    await nftMarketplace.connect(userAddress4).bid(nft.address, 1, {
      value: salePrice4,
    });
    console.log(
      "USER 5 place bid",
      ethers.utils.formatEther(
        await provider.getBalance(nftMarketplace.address)
      ),
      ethers.utils.formatEther(await userAddress1.getBalance()),
      ethers.utils.formatEther(await userAddress2.getBalance()),
      ethers.utils.formatEther(await userAddress3.getBalance()),
      ethers.utils.formatEther(await userAddress4.getBalance()),
      ethers.utils.formatEther(await userAddress5.getBalance())
    );

    let auctionDetail = await nftMarketplace.getTokenAuctionDetails(
      nft.address,
      1
    );
    console.log("Auction Details", auctionDetail);
    let auctionDetail1 = await nftMarketplace.getTokenAuctionDetails(
      nft.address,
      2
    );
    console.log("Auction Details", auctionDetail1);
    await sleep(60000);
    await nftMarketplace.executeSale(nft.address, 1);
    console.log(
      "After Execution of Auction",
      ethers.utils.formatEther(
        await provider.getBalance(nftMarketplace.address)
      ),
      ethers.utils.formatEther(await userAddress1.getBalance()),
      ethers.utils.formatEther(await userAddress2.getBalance()),
      ethers.utils.formatEther(await userAddress3.getBalance()),
      ethers.utils.formatEther(await userAddress4.getBalance()),
      ethers.utils.formatEther(await userAddress5.getBalance())
    );
  });

  it("Update an Get Gas Fee By Admin", async function () {
    await nftMarketplace.connect(userAddress1).updateGasFee(newListingPrice);
    let newPrice = await nftMarketplace.getGasFee();
    console.log(listingPrice, newPrice.toString());
  });
});
