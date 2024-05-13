import { ethers } from "hardhat";

async function main() {
  const NFTMinter = await ethers.getContractFactory("DooWorldMinter");
  const nftMinter = await NFTMinter.deploy("0x0270B55d0c88111dAe75085f262Fd4a4b1f7d395");
  await nftMinter.deployed();
  console.log("DooWorldMinter deployed to:", nftMinter.address);
  const NFTMarket = await ethers.getContractFactory("DooWorldMarketplace");
  const nftMarket = await NFTMarket.deploy("0x0270B55d0c88111dAe75085f262Fd4a4b1f7d395");
  await nftMarket.deployed();
  console.log("DooWorldMarketplace deployed to:", nftMarket.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
