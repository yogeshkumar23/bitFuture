import * as Ethers from "ethers";
import React from "react";
import * as Router from "react-router-dom";
import * as Api from "src/api";
import * as Contexts from "src/app/contexts";
import * as Constants from "src/constants";
import * as Providers from "src/app/providers";
import * as DOOMARKET from "src/api/contract/DOOMARKET.json";

export const useNFT = () => {
  const handler = Providers.useCustomHandler;
  const user = React.useContext(Contexts.UserContext);
  const provider = window.ethereum
    ? new Ethers.ethers.providers.Web3Provider(window.ethereum)
    : null;
  const signer = provider?.getSigner() as any;
  const market = new Ethers.ethers.Contract(
    Constants.NFT.contractAddress,
    DOOMARKET.abi,
    signer
  );
  const eventFilter = market.filters.Logger();
  const iface = new Ethers.ethers.utils.Interface([
    "event Logger(address indexed nftContract, uint256 indexed tokenId, string[2] logType, address from, address to, uint256 price, uint256 gasFee, uint enteredQuantity)",
  ]);
  const [authenticated, setAuthentication] = React.useState(false);
  const [trigger, setTrigger] = React.useState(0);
  const [network, setNetwork] = React.useState(0);
  const [account, setAccount] = React.useState<string>();
  const [balance, setBalance] = React.useState<string>();
  const [gasFee, setGasFee] = React.useState("");
  const [logs, setLogs] = React.useState<logger[]>();
  const [nfts, setNfts] = React.useState<nft[]>();
  const { pathname } = Router.useLocation();

  // Get verify message and user detail
  const getVerifyUser = (_signature: string) => {
    return Ethers.ethers.utils.verifyMessage(
      `Welcome to ${Constants.NFT.name} NFT Marketplace by uid ${user?.uid}`,
      _signature
    );
  };

  // connector
  const asyncConnector = async () => {
    if (account && user?.email) {
      if (user?.signature && user?.metaMaskWallet) {
        const verifiedAddress = getVerifyUser(user?.signature);
        setAuthentication(
          account.trim().toLowerCase() === verifiedAddress.trim().toLowerCase()
        );
      }
    }
  };

  // Initial Connect in metamask
  const connect = async () => {
    if (window?.ethereum) {
      const accounts = await window.ethereum.request<string[]>({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      await asyncConnector();
    }
  };

  // Get Account balance
  const getBalance = async () => {
    if (account) {
      provider
        ?.getBalance(account)
        .then((accountBalance) =>
          setBalance(Ethers.ethers.utils.formatEther(accountBalance))
        );
    }
  };

  const changeGasFee = async (price: string) => {
    const result = await market.updateGasFee(
      Ethers.ethers.utils.parseUnits(price, "ether")
    );
    handler({
      variant: "info",
      message: "Please wait for transaction complete",
    });
    await result.wait();
    handler({
      variant: "success",
      message: "Gas Fee Updated",
    });
  };

  // Mint New NFT
  // const newNFT = async (
  //   file: File,
  //   price: string,
  //   metadata: { name: string; description: string }
  // ) => {
  //   try {
  //     const data = new FormData();
  //     data.append("file", file);
  //     data.append("pinataMetadata", JSON.stringify(metadata));
  //     data.append("pinataOptions", JSON.stringify({ cidVersion: 0 }));
  //     const metadataURI = await Api.Server.Request("pinFileToIPFS", data, {
  //       pinata_api_key: Constants.NFT.PINATA_API_KEY,
  //       pinata_secret_api_key: Constants.NFT.PINATA_SECRET_KEY,
  //     }).then((res) => res.IpfsHash);
  //     /* Create NFT metadata JSON */
  //     const pinataJSONBody = {
  //       pinataContent: {
  //         image: `https://gateway.pinata.cloud/ipfs/${metadataURI}`,
  //         ...metadata,
  //       },
  //     };
  //     const tokenURIHash = await Api.Server.Request(
  //       "pinJSONToIPFS",
  //       pinataJSONBody,
  //       {
  //         pinata_api_key: Constants.NFT.PINATA_API_KEY,
  //         pinata_secret_api_key: Constants.NFT.PINATA_SECRET_KEY,
  //       }
  //     ).then((res) => res.IpfsHash);
  //     const result = await market.createToken(
  //       `https://gateway.pinata.cloud/ipfs/${tokenURIHash}`,
  //       Ethers.ethers.utils.parseUnits(price, "ether"),
  //       JSON.stringify(metadata),
  //       { value: Ethers.ethers.utils.parseUnits(gasFee, "ether") }
  //     );
  //     await result.wait();
  //     handler({ variant: "success", message: "Token Minted Successfully" });
  //   } catch (e: any) {
  //     handler({ variant: "error", message: e.message });
  //   }
  // };

  // Get All Other User Market Items
  const getItems = async () => {
    Api.Server.Client.get(
      `${Constants.NFT.baseURL}/getNFTs?owner=${Constants.NFT.contractAddress}`
    ).then(async (res) => {
      const data = await Promise.all(
        res.data.ownedNfts
          .map(async (nft: any) => {
            const detail = await market
              .getTokenMarketItemDetails(
                nft.contract.address,
                parseInt(nft?.id?.tokenId?.toString())
              )
              .catch(() => undefined);
            const auctionDetail = await market
              .getTokenAuctionDetails(
                nft.contract.address,
                parseInt(nft?.id?.tokenId?.toString())
              )
              .catch(() => undefined);
            return detail || auctionDetail
              ? {
                  price: Ethers.ethers.utils.formatEther(
                    detail.sale ? detail.price : auctionDetail.price
                  ),
                  tokenId: parseInt(nft?.id?.tokenId?.toString()),
                  tokenURI: nft?.media?.[0]?.raw,
                  owner: Boolean(+auctionDetail?.seller?.toString())
                    ? auctionDetail.seller
                    : detail.seller,
                  metadata: {
                    name: nft?.metadata?.name,
                    description: nft?.metadata?.description,
                  },
                  sale: detail?.sale || false,
                  contract: nft.contract.address,
                  isApproved: true,
                  isAuction: auctionDetail?.isActive || false,
                  isAuctionDuration: auctionDetail.duration.toNumber(),
                  highestBid: auctionDetail?.maxBid
                    ? Ethers.ethers.utils.formatEther(auctionDetail.maxBid)
                    : `0`,
                  highestBidder: auctionDetail?.maxBidUser,
                  bidders: auctionDetail?.bidAmounts?.map(
                    (bid: string, index: number) => ({
                      price: Ethers.ethers.utils.formatEther(bid),
                      address: auctionDetail?.users[index],
                    })
                  ),
                }
              : {
                  price: `0`,
                  tokenId: parseInt(nft?.id?.tokenId?.toString()),
                  tokenURI: nft?.media?.[0]?.raw,
                  owner: nft.contract.address,
                  metadata: {
                    name: nft?.metadata?.name,
                    description: nft?.metadata?.description,
                  },
                  sale: true,
                  contract: nft.contract.address,
                  isApproved: true,
                  isAuction: false,
                  isAuctionDuration: 0,
                  highestBid: `0`,
                  highestBidder: `0x0`,
                  bidders: [],
                };
          })
          .filter(Boolean)
      );
      setNfts(data || []);
    });
  };

  React.useEffect(() => {
    asyncConnector();
    getItems();
    if (window.ethereum) {
      market.queryFilter(eventFilter).then(
        async (_logs) =>
          await Promise.all(
            _logs.map(async (log) => {
              const logArgs = iface.parseLog(log).args;
              return {
                time: await log
                  .getBlock()
                  .then((block) => block.timestamp * 1000),
                contract: logArgs.nftContract,
                tokenId: logArgs.tokenId.toNumber(),
                logType: logArgs.logType[0],
                from: logArgs.from,
                to: logArgs.to,
                price: Ethers.ethers.utils.formatEther(logArgs.price),
                fee: Ethers.ethers.utils.formatEther(logArgs.gasFee),
                enteredQuantity: Ethers.ethers.utils.formatEther(
                  logArgs.enteredQuantity
                ),
              };
            })
          ).then((_logs) => setLogs(_logs.flat()))
      );
    } else setLogs([]);
  }, [trigger, account, network]);

  React.useEffect(() => {
    const getGasFee = async () => {
      const gasFee = await market.getGasFee();
      const gasPrice = (await provider?.getGasPrice()) || 0;
      setGasFee(
        (
          +Ethers.ethers.utils.formatEther(gasFee.toString()) +
          +Ethers.ethers.utils.formatEther(gasPrice.toString())
        ).toString()
      );
    };
    if (pathname?.includes("nft")) {
      window.ethereum
        ?.request<string[]>({ method: "eth_accounts" })
        .then((accounts) => setAccount(accounts[0]));
      window.ethereum?.on<string[]>("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });
    }
    if (account) {
      getBalance();
      getGasFee();
    }
  }, [account, window.ethereum, trigger, network]);

  React.useEffect(() => {
    provider?.getBlockNumber().then(setTrigger);
  }, [provider]);

  React.useEffect(() => {
    provider?.detectNetwork().then(async (network) => {
      if (network.chainId !== +Constants.NFT.chainId && window.ethereum) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              { chainId: `0x${parseInt(Constants.NFT.chainId).toString(16)}` },
            ],
          } as any);
          setNetwork(+Constants.NFT.chainId);
        } catch (error: any) {
          if (error.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: `0x${parseInt(Constants.NFT.chainId).toString(
                      16
                    )}`,
                    rpcUrl: Constants.NFT.rpcUrl,
                  },
                ],
              } as any);
            } catch (addError) {
              console.error(addError);
            }
          }
        }
      } else setNetwork(network.chainId);
    });
  }, []);

  return {
    account,
    authenticated,
    syncedAccount: user?.metaMaskWallet?.toLowerCase(),
    balance,
    gasFee,
    nfts,
    logs,
    changeGasFee,
    connect,
    // newNFT,
    getItems,
  };
};
