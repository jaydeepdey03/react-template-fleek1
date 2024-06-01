/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import {useEffect, useState, createContext, ReactNode, useContext} from "react";
import {ethers} from "ethers";
const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

declare global {
  interface Window {
    ethereum: any;
  }
}

export const VoterContext = createContext<{
  switchNetwork: (chainId: string) => Promise<void>;
  connectWallet: () => void;
  contractAddress: string;
  contract: any;
  chainId: string;
}>({
  switchNetwork: () => new Promise(() => {}),
  connectWallet: () => {},
  contractAddress: "",
  contract: null,
  chainId: "",
});

export const ContractContextProvider = ({children}: {children: ReactNode}) => {
  const [chainId, setChainId] = useState("");

  const [currentAccount, setCurrentAccount] = useState("");
  const [contract, setContract] = useState<any>(null);

  const contractAddress = "0x585f59c9143A4E4f94eE34Bba45330b99a27f4Fe";
  const contractABI = abi;
  const ethereum = window?.ethereum;

  useEffect(() => {
    const getContract = () => {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const loomHubContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      setContract(loomHubContract);
    };
    if (ethereum) getContract();
  }, [ethereum, contractABI]);

  useEffect(() => {
    if (ethereum) {
      ethereum.on("accountsChanged", (accounts: any) => {
        setCurrentAccount(accounts[0]);
      });
    } else console.log("No metamask!");

    return () => {
      // ethereum.removeListener('accountsChanged');
    };
  }, [ethereum]);

  // Reload the page when they change networks
  function handleChainChanged() {
    window.location.reload();
  }

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        if (!ethereum) {
          console.log("Metamask not found");
          return;
        } else console.log("we have etherium object");

        const accounts = await ethereum.request({method: "eth_accounts"}); //check if there are accounts connected to the site

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          // if (currentAccount !== "")
          setCurrentAccount(account);

          // votingSystem();
        } else {
          setCurrentAccount("");
          console.log("No authorized accounts found!");
        }

        const curr_chainId = await ethereum.request({method: "eth_chainId"});
        setChainId(curr_chainId);

        ethereum.on("chainChanged", handleChainChanged);
      } catch (error) {
        console.log(error);
      }
    };

    checkIfWalletIsConnected();
  }, [currentAccount, contractABI, ethereum]);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"}); // request connection with accounts
      // console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      // const chainId = await ethereum.request({ method: 'eth_chainId' });
    } catch (e) {
      console.log(e);
    }
  };

  const switchNetwork = async (chainId: string) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{chainId: chainId}], // Check networks.js for hexadecimal network ids
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     if (chainId !== "0x13881" || !currentAccount) {
  //       switchNetwork();
  //     }
  //   }, [chainId, currentAccount]);

  return (
    <VoterContext.Provider
      value={{
        chainId,
        switchNetwork,
        connectWallet,
        contractAddress,
        contract,
      }}
    >
      {children}
    </VoterContext.Provider>
  );
};

export const useContractHook = () => {
  return useContext(VoterContext);
};
