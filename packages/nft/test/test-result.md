# NFTMarketplace uint testing result

```

> nft@0.0.0 test
> npx hardhat test "test/Marketplace.test.ts"



  Marketplace Buy/Sell Concept
Minter deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
Marketplace deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
[
  {
    tokenId: 1,
    owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    tokenURI: 'a'
  }
]
    ✔ Create Token in Minter contract (203ms)
[
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  BigNumber { value: "1000000000000000000" },
  true,
  seller: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  price: BigNumber { value: "1000000000000000000" },
  sale: true
]
[
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  BigNumber { value: "1000000000000000000" },
  true,
  seller: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  price: BigNumber { value: "1000000000000000000" },
  sale: true
]
[
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  BigNumber { value: "1000000000000000000" },
  true,
  seller: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  price: BigNumber { value: "1000000000000000000" },
  sale: true
]
[
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  BigNumber { value: "1000000000000000000" },
  true,
  seller: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  price: BigNumber { value: "1000000000000000000" },
  sale: true
]
    ✔ Create market Items from other contract (597ms)
[
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  BigNumber { value: "3000000000000000000" },
  false,
  seller: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  price: BigNumber { value: "3000000000000000000" },
  sale: false
]
    ✔ Change Price for Token (149ms)
[
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  BigNumber { value: "3000000000000000000" },
  true,
  seller: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  price: BigNumber { value: "3000000000000000000" },
  sale: true
]
[
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  BigNumber { value: "3000000000000000000" },
  false,
  seller: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  price: BigNumber { value: "3000000000000000000" },
  sale: false
]
    ✔ Make and Cancel Market Items (311ms)
[
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  BigNumber { value: "3000000000000000000" },
  false,
  seller: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  price: BigNumber { value: "3000000000000000000" },
  sale: false
]
    ✔ Buy Token (142ms)
[
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  BigNumber { value: "3000000000000000000" },
  false,
  seller: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  price: BigNumber { value: "3000000000000000000" },
  sale: false
]
    ✔ Re Buy Token (280ms)
[
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  BigNumber { value: "3000000000000000000" },
  false,
  seller: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  price: BigNumber { value: "3000000000000000000" },
  sale: false
]
    ✔ Transfer Token (130ms)
Before Execution of Auction 9999.019548013453368725 9999.874836620835227901 9999.999974583506203656
USER 2 place bid 9999.019548013453368725 9996.874827163204482191
USER 3 place bid 9999.019548013453368725 9995.999968732210219056
Auction Details [
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  BigNumber { value: "1000000000000000000" },
  BigNumber { value: "1662209869" },
  BigNumber { value: "4000000000000000000" },
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  true,
  [
    BigNumber { value: "3000000000000000000" },
    BigNumber { value: "4000000000000000000" }
  ],
  [
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'
  ],
  seller: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  price: BigNumber { value: "1000000000000000000" },
  duration: BigNumber { value: "1662209869" },
  maxBid: BigNumber { value: "4000000000000000000" },
  maxBidUser: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  isActive: true,
  bidAmounts: [
    BigNumber { value: "3000000000000000000" },
    BigNumber { value: "4000000000000000000" }
  ],
  users: [
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'
  ]
]
After Execution of Auction 10003.019543250199176207 9999.874827163204482191 9995.999968732210219056
    ✔ Auction flow (60549ms)
25000000000000000 10000000000000000
    ✔ Update an Get Gas Fee By Admin (44ms)


  9 passing (1m)


```
