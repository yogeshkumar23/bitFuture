import * as Ethers from "ethers";
import React from "react";
import * as Router from "react-router-dom";
import * as Api from "src/api";
import * as Constants from "src/constants";
import * as Providers from "src/app/providers";
import * as Hooks from "src/app/hooks";
import * as DOOMARKET from "src/api/contract/DOOMARKET.json";

export const useNFT = (user: Hooks.User.UseUser.User, update: () => void) => {
  const handler = Providers.useCustomHandler;
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
  const [popupReducer, setPopupReducer] = React.useState(false);
  const [authenticated, setAuthentication] = React.useState(false);
  const [trigger, setTrigger] = React.useState(0);
  const [network, setNetwork] = React.useState(0);
  const [account, setAccount] = React.useState<string>();
  const [balance, setBalance] = React.useState<string>();
  const [gasFee, setGasFee] = React.useState("0");
  const [nfts, setNfts] = React.useState<nft[]>();
  const [logs, setLogs] = React.useState<logger[]>();
  const [marketNfts, setMarketNfts] = React.useState<nft[]>();
  const { pathname } = Router.useLocation();

  const { data: users } =
    Hooks.Firebase.useFireSnapshot<Hooks.User.UseUser.User>(
      "collection",
      "users"
    ).collectionSnapshot(
      [],
      !pathname.includes("dashboard") && Boolean(account)
    );

  // connector
  const asyncConnector = async () => {
    if (account && user?.email) {
      if (user?.signature && user?.metaMaskWallet) {
        const verifiedAddress = getVerifyUser(user?.signature);
        setAuthentication(
          account.trim().toLowerCase() === verifiedAddress.trim().toLowerCase()
        );
      } else await signin(account);
    }
  };

  // Initial Connect in metamask
  const connect = async () => {
    if (window?.ethereum) {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];
      setAccount(accounts[0]);
      await asyncConnector();
    }
  };

  // Signin wallet
  const signWallet = async (_signature: string) => {
    const userData = {
      ...user,
      profileImage: "",
      removeProfileImage: false,
      signature: _signature,
      metaMaskWallet: getVerifyUser(_signature),
    };
    var bodyData = new FormData();
    Object.entries(userData).map(([key, value]) =>
      bodyData.append(key, value as string | Blob)
    );
    await Api.Server.Request("editProfile", bodyData).then((res) => {
      handler({
        variant: res.error ? "error" : "success",
        message: res.error
          ? "This account already in use"
          : res.message.replace(/(\[.*\]|\(.*\))/g, ""),
      });
      if (!res.error) update();
    });
  };

  // Get Signin user signature
  const signin = async (_account: string) => {
    if (!popupReducer) {
      setPopupReducer(true);
      await signer
        ?.signMessage(
          `Welcome to ${Constants.NFT.name} NFT Marketplace by uid ${user?.uid}`
        )
        .then((_sign: string) => {
          signWallet(_sign);
        })
        .catch((e: Error) =>
          handler({
            variant: "error",
            message: e.message.replace(/(\[.*\]|\(.*\))/g, ""),
          })
        )
        .finally(() => setPopupReducer(false));
    }
  };

  // Get verify message and user detail
  const getVerifyUser = (_signature: string) => {
    return Ethers.ethers.utils.verifyMessage(
      `Welcome to ${Constants.NFT.name} NFT Marketplace by uid ${user?.uid}`,
      _signature
    );
  };

  // Get user account balance
  const getBalance = async () => {
    if (account) {
      provider
        ?.getBalance(account)
        .then((accountBalance) =>
          setBalance(Ethers.ethers.utils.formatEther(accountBalance))
        );
    }
  };

  // Check is Approved
  const isApproved = async (contractAddress: string, tokenId: string) => {
    try {
      const provider = window.ethereum
        ? new Ethers.ethers.providers.Web3Provider(window.ethereum)
        : null;
      const signer = provider?.getSigner() as any;
      const tokenHolder = new Ethers.ethers.Contract(
        contractAddress,
        Constants.tokenABI,
        signer
      );
      const isApproved = await tokenHolder
        .getApproved(tokenId)
        .then((address: any) => {
          return Boolean(
            address.toLowerCase() ===
              Constants.NFT.contractAddress.toLowerCase()
          );
        });
      return isApproved;
    } catch (e: any) {
      // handler({ variant: "error", message: "Approval Not Supported" });
      return false;
    }
  };

  // Get Approval from user
  const getApproval = async (contractAddress: string, tokenId: string) => {
    try {
      const provider = window.ethereum
        ? new Ethers.ethers.providers.Web3Provider(window.ethereum)
        : null;
      const signer = provider?.getSigner() as any;
      const tokenHolder = new Ethers.ethers.Contract(
        contractAddress,
        Constants.tokenABI,
        signer
      );
      const result = await tokenHolder.approve(
        Constants.NFT.contractAddress,
        tokenId
      );
      handler({
        variant: "info",
        message: "Please wait for transaction complete",
      });
      await result.wait();
      handler({
        variant: "success",
        message: "Approval Successfull",
      });
      return true;
    } catch (e: any) {
      handler({
        variant: "error",
        message: e.message.replace(/(\[.*\]|\(.*\))/g, ""),
      });
      return false;
    }
  };

  // Mint New NFT
  const newNFT = async (
    file: File,
    price: string,
    metadata: { name: string; description: string }
  ) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("pinataMetadata", JSON.stringify(metadata));
      data.append("pinataOptions", JSON.stringify({ cidVersion: 0 }));
      const metadataURI = await Api.Server.Request("pinFileToIPFS", data, {
        pinata_api_key: Constants.NFT.PINATA_API_KEY,
        pinata_secret_api_key: Constants.NFT.PINATA_SECRET_KEY,
      }).then((res) => res.IpfsHash);
      /* Create NFT metadata JSON */
      const pinataJSONBody = {
        pinataContent: {
          image: `https://gateway.pinata.cloud/ipfs/${metadataURI}`,
          ...metadata,
        },
      };
      const tokenURIHash = await Api.Server.Request(
        "pinJSONToIPFS",
        pinataJSONBody,
        {
          pinata_api_key: Constants.NFT.PINATA_API_KEY,
          pinata_secret_api_key: Constants.NFT.PINATA_SECRET_KEY,
        }
      ).then((res) => res.IpfsHash);
      const result = await market.createToken(
        `https://gateway.pinata.cloud/ipfs/${tokenURIHash}`,
        Ethers.ethers.utils.parseUnits(price, "ether"),
        JSON.stringify(metadata),
        { value: Ethers.ethers.utils.parseUnits(gasFee, "ether") }
      );
      await result.wait();
      handler({ variant: "success", message: "Token Minted Successfully" });
    } catch (e: any) {
      handler({
        variant: "error",
        message: e.message.replace(/(\[.*\]|\(.*\))/g, ""),
      });
    }
  };

  // Transfer NFT to address
  const transfer = async (
    contract: string,
    depositAddress: string,
    tokenId: string,
    fee: boolean
  ) => {
    try {
      const result = await market.transferToken(
        contract,
        depositAddress,
        tokenId,
        fee,
        fee
          ? {
              value: Ethers.ethers.utils.parseUnits(gasFee, "ether"),
            }
          : {}
      );
      handler({
        variant: "info",
        message: "Please wait for transaction complete",
      });
      await result.wait();
      handler({
        variant: "success",
        message: "Token transferred successfully",
      });
      return false;
    } catch (e: any) {
      handler({
        variant: "error",
        message: e.message.replace(/(\[.*\]|\(.*\))/g, ""),
      });
      return true;
    }
  };

  // Mark and UnMark for Sale of MarketItem
  const toggleSale = async (nftDetail: nft, price: string) => {
    try {
      if (nftDetail.isApproved) {
        const result = await market.toggleSale(
          nftDetail.contract,
          nftDetail.tokenId,
          Ethers.ethers.utils.parseUnits(price, "ether")
        );
        handler({
          variant: "info",
          message: "Please wait for transaction complete",
        });
        await result.wait();
        handler({
          variant: "success",
          message: `NFT ${nftDetail?.sale ? "Un Marked" : "Marked"} For Sale`,
        });
      } else {
        const result = await market.createMarketItem(
          nftDetail.contract,
          nftDetail.tokenId,
          Ethers.ethers.utils.parseUnits(price, "ether"),
          { value: Ethers.ethers.utils.parseUnits(gasFee, "ether") }
        );
        handler({
          variant: "info",
          message: "Please wait for transaction complete",
        });
        await result.wait();
        handler({
          variant: "success",
          message: `NFT Marked For Sale and Registered`,
        });
      }
    } catch (e: any) {
      handler({
        variant: "error",
        message: e.message.replace(/(\[.*\]|\(.*\))/g, ""),
      });
    }
  };

  // Buy Market Item
  const buyNFT = async (contract: string, tokenId: string, price: string) => {
    try {
      const result = await market.buy(contract, tokenId, {
        value: Ethers.ethers.utils.parseUnits(
          (+price + +gasFee).toFixed(12),
          "ether"
        ),
      });
      handler({
        variant: "info",
        message: "Please wait for transaction complete",
      });
      await result.wait();
      handler({
        variant: "success",
        message: `NFT Buy Successfull`,
      });
    } catch (e: any) {
      handler({
        variant: "error",
        message: e.message.replace(/(\[.*\]|\(.*\))/g, ""),
      });
    }
  };

  // Start Auction
  const startAuction = async (
    contract: string,
    tokenId: string,
    price: string,
    duration: string
  ) => {
    try {
      const result = await market.startAuction(
        contract,
        tokenId,
        Ethers.ethers.utils.parseUnits(price, "ether"),
        duration,
        {
          value: Ethers.ethers.utils.parseUnits(gasFee, "ether"),
        }
      );
      handler({
        variant: "info",
        message: "Please wait for transaction complete",
      });
      await result.wait();
      handler({
        variant: "success",
        message: `NFT Aution Started with initial price ${price} ETH`,
      });
    } catch (e: any) {
      handler({
        variant: "error",
        message: e.message.replace(/(\[.*\]|\(.*\))/g, ""),
      });
    }
  };

  // Stop Auction
  const stopAuction = async (contract: string, tokenId: string) => {
    try {
      const result = await market.cancelAuction(contract, tokenId);
      handler({
        variant: "info",
        message: "Please wait for transaction complete",
      });
      await result.wait();
      handler({
        variant: "success",
        message: `NFT Aution Ended`,
      });
    } catch (e: any) {
      handler({
        variant: "error",
        message: e.message.replace(/(\[.*\]|\(.*\))/g, ""),
      });
    }
  };

  // Execute Auction
  const executeAuction = async (contract: string, tokenId: string) => {
    try {
      const result = await market.executeSale(contract, tokenId);
      handler({
        variant: "info",
        message: "Please wait for transaction complete",
      });
      await result.wait();
      handler({
        variant: "success",
        message: `NFT Aution Executed`,
      });
    } catch (e: any) {
      handler({
        variant: "error",
        message: e.message.replace(/(\[.*\]|\(.*\))/g, ""),
      });
    }
  };

  // Place a bid for Auction
  const placeBid = async (contract: string, tokenId: string, price: string) => {
    try {
      const result = await market.bid(contract, tokenId, {
        value: Ethers.ethers.utils.parseUnits(price, "ether"),
      });
      handler({
        variant: "info",
        message: "Please wait for transaction complete",
      });
      await result.wait();
      handler({
        variant: "success",
        message: `Your ${price} ETH bid placed`,
      });
    } catch (e: any) {
      handler({
        variant: "error",
        message: e.message.replace(/(\[.*\]|\(.*\))/g, ""),
      });
    }
  };

  // Get All Other User Market Items
  const getMarketItems = async () => {
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
                  owner: Constants.NFT.contractAddress,
                  metadata: {
                    name: nft?.metadata?.name,
                    description: nft?.metadata?.description,
                  },
                  sale: false,
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
      setMarketNfts(data || []);
    });
  };

  // Get User NFT Collections
  const getItems = () => {
    if (user?.metaMaskWallet) {
      Api.Server.Client.get(
        `${Constants.NFT.baseURL}/getNFTs?owner=${user?.metaMaskWallet}`
      ).then(async (res) => {
        const data = await Promise.all(
          res.data.ownedNfts.map(async (nft: any): Promise<nft> => {
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
            return {
              price: detail?.price
                ? Ethers.ethers.utils.formatEther(detail.price)
                : `0`,
              tokenId: parseInt(nft?.id?.tokenId?.toString()),
              tokenURI: nft?.media?.[0]?.raw,
              owner: nft.contract.address,
              metadata: {
                name: nft?.metadata?.name,
                description: nft?.metadata?.description,
              },
              sale: detail?.sale || false,
              contract: nft.contract.address,
              isApproved: Boolean(+detail?.seller?.toString()),
              isAuction: auctionDetail?.isActive || false,
              isAuctionDuration: 0,
              highestBid: `0`,
              highestBidder: "0x00",
              bidders: auctionDetail?.bidAmounts?.map(
                (bid: string, index: number) => ({
                  price: Ethers.ethers.utils.formatEther(bid),
                  address: auctionDetail?.users[index],
                })
              ),
            };
          })
        );
        setNfts(data || []);
      });
    }
  };

  React.useEffect(() => {
    // if (
    //   pathname.includes("nft") ||
    //   pathname.includes("dashboard") ||
    //   pathname.includes("titapay")
    // ) {
    asyncConnector();
    if (account) {
      market.queryFilter(eventFilter).then(
        async (_logs) =>
          await Promise.all(
            _logs.map(async (log) => {
              const logArgs = iface.parseLog(log).args;
              return [
                logArgs.from.toLowerCase(),
                logArgs.to.toLowerCase(),
              ].includes(user?.metaMaskWallet?.toLowerCase())
                ? {
                    time: await log
                      .getBlock()
                      .then((block) => block.timestamp * 1000),
                    contract: logArgs.nftContract,
                    tokenId: logArgs.tokenId.toNumber(),
                    logType:
                      logArgs.logType[
                        Number(
                          logArgs.from.toLowerCase() !==
                            user?.metaMaskWallet?.toLowerCase()
                        )
                      ] || logArgs.logType[0],
                    from:
                      users?.find(
                        (user) =>
                          user.metaMaskWallet?.toLowerCase() ===
                          logArgs.from.toLowerCase()
                      )?.email || "TITAcenter Market",
                    to:
                      users?.find(
                        (user) =>
                          user.metaMaskWallet?.toLowerCase() ===
                          logArgs.to.toLowerCase()
                      )?.email || "TITAcenter Market",
                    price: Ethers.ethers.utils.formatEther(logArgs.price),
                    fee: Ethers.ethers.utils.formatEther(logArgs.gasFee),
                    enteredQuantity: Ethers.ethers.utils.formatEther(
                      logArgs.enteredQuantity
                    ),
                  }
                : [];
            })
          ).then((_logs) => setLogs(_logs.flat()))
      );
    } else setLogs([]);
    // }
    getMarketItems();
    getItems();
  }, [
    trigger,
    account,
    user?.metaMaskWallet,
    network,
    // pathname,
    users?.length,
  ]);

  React.useEffect(() => {
    // if (
    //   pathname.includes("nft") ||
    //   pathname.includes("dashboard") ||
    //   pathname.includes("titapay")
    // ) {
    const getGasFee = async () => {
      const gasFee = await market.getGasFee();
      const gasPrice = (await provider?.getGasPrice()) || 0;
      setGasFee(
        (
          +Ethers.ethers.utils.formatEther(gasFee.toString()) +
          +Ethers.ethers.utils.formatEther(gasPrice.toString())
        )
          .toFixed(10)
          .toString()
      );
    };
    window.ethereum
      ?.request<string[]>({ method: "eth_accounts" })
      .then((accounts) => setAccount(accounts[0]));
    window.ethereum?.on<string[]>("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
    if (account) {
      getBalance();
      getGasFee();
    }
    // }
  }, [account, window.ethereum, network, trigger]);

  React.useEffect(() => {
    provider?.getBlockNumber().then(setTrigger);
  }, [provider]);

  React.useEffect(() => {
    // if (
    //   pathname.includes("nft") ||
    //   pathname.includes("dashboard") ||
    //   pathname.includes("titapay")
    // ) {
    provider?.detectNetwork().then(async (network) => {
      if (network.chainId !== +Constants.NFT.chainId && window.ethereum) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: `0x${parseInt(Constants.NFT.chainId).toString(16)}`,
              },
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
    // }
  }, []);

  return {
    user,
    account: account?.toLowerCase(),
    syncedAccount: user?.metaMaskWallet?.toLowerCase(),
    balance,
    gasFee,
    nfts: pathname.includes("titapay")
      ? nfts?.filter(({ tokenURI }) => Boolean(tokenURI))
      : ([
          marketNfts
            ?.filter(Boolean)
            ?.filter(
              ({ owner }) =>
                owner.toLowerCase() === user?.metaMaskWallet?.toLowerCase()
            ),
          nfts?.filter(({ tokenURI }) => Boolean(tokenURI)),
        ]
          .flat()
          .filter(Boolean) as nft[]),
    marketNfts: marketNfts
      ?.filter(Boolean)
      ?.filter(
        ({ isAuction, isAuctionDuration, owner }) =>
          (isAuction
            ? isAuctionDuration > new Date().getTime() / 1000
            : true) &&
          owner?.toLowerCase() !== user?.metaMaskWallet?.toLowerCase()
      ),
    connect,
    toggleSale,
    transfer,
    buyNFT,
    getItems,
    getApproval,
    isApproved,
    startAuction,
    stopAuction,
    placeBid,
    executeAuction,
    signin,
    logs: authenticated ? logs : [],
    authenticated,
  };
};
