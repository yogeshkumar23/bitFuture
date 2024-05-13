import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";

describe("DooWorldMinter Buy/Sell Concept", () => {
  let NFT,
    nft: Contract,
    listingPrice: string | number,
    newListingPrice: string | number | BigNumber,
    userAddress1: any;

  before(async () => {
    const [_userAddress1] = await ethers.getSigners();
    userAddress1 = _userAddress1;
    /* deploy the marketplace */
    NFT = await ethers.getContractFactory("DooWorldMinter");
    nft = await NFT.deploy(_userAddress1.getAddress());
    await nft.deployed();
    console.log("DooWorldMinter deployed to:", nft.address);
    listingPrice = await nft.getGasFee();
    listingPrice = listingPrice.toString();
    newListingPrice = ethers.utils.parseUnits("0.01", "ether");
  });

  it("Create Token", async function () {
    /* USER 1 TOKENS = [a,b] */
    await nft.createToken("a", { value: listingPrice });
    await nft.createToken("b", { value: listingPrice });
  });

  it("Get All Tokens By Admin", async function () {
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

  it("Update an Get Gas Fee", async function () {
    await nft.connect(userAddress1).updateGasFee(newListingPrice);
    let newPrice = await nft.getGasFee();
    console.log(listingPrice, newPrice.toString());
  });
});
