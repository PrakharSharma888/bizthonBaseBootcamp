import react from "react";
import { ethers } from "ethers";
import { useState } from "react";

function Crowdfund() {
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const contractAddress = "0x43f6101505BCA7eF2E6bBb330bEb121513E19b99";

  async function main() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);

    const abi = [
      {
        inputs: [],
        name: "endFunding",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "setFund",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_endTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_goalAmount",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "withdrawalSomeFunds",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "withdrawlAll",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "checkAllFunds",
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
        inputs: [
          {
            internalType: "address",
            name: "myAddress",
            type: "address",
          },
        ],
        name: "checkYourFunds",
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
        name: "endTime",
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
        name: "goalAmount",
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
        name: "isStarted",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];

    const signer1 = await provider.getSigner();
    setSigner(signer1);
    const crowdFundContract = new ethers.Contract(contractAddress, abi, signer);
    setContract(crowdFundContract);
  }

  async function handleBalanceCheck() {
    const balanceAll = await contract.checkAllFunds();
    setBalance(balanceAll.toString());
    console.log(balanceAll.toString());
  }

  async function handleYourBalance() {
    const yourFunds = await contract.checkYourFunds();
    console.log(yourFunds);
  }

  return (
    <>
    <button onClick={main}>Connect Wallet</button>
      <button onClick={handleBalanceCheck}>Get Balance</button>
      <button onClick={handleYourBalance}>Get Your Balance</button>
      <h1>{balance}</h1>
    </>
  );
}

export default Crowdfund;
