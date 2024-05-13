import "@nomiclabs/hardhat-waffle";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default {
  solidity: "0.8.4",
  defaultNetwork: "goerli",
  mocha: {
    timeout: 100000000,
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/xEFP3lFJ6-7qvX3WUOsszCUeQumig1vj`,
      accounts: [
        `0xd6beebee7e7b24be5b5c9e53033fc0e9a34f713f7d8c6c5189039da937b4b4e4`,
        `0x226320993093b4702296dc389f61f35d834fc9ab6486a6b4385bf171086b5b72`,
      ],
    },
    polygon: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/z5Vv7iiTVywvx15nkyI6gsPTKdXrcF-a`,
      accounts: [
        `0xd6beebee7e7b24be5b5c9e53033fc0e9a34f713f7d8c6c5189039da937b4b4e4`,
        `0x226320993093b4702296dc389f61f35d834fc9ab6486a6b4385bf171086b5b72`,
      ],
    },
  },
};
