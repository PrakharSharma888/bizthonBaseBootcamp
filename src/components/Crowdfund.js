import react from "react";
import { ethers } from "ethers";
import { useState } from "react";

function Crowdfund() {
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [signer2, setSigner2] = useState(null);
  const [contract, setContract] = useState(null);
  const [contract2, setContract2] = useState(null) 
  const [yourBalance, setYourBalance] = useState(null)


  const contractAddress = "0x5D6A7dd379D2b0015CCEE863AB9FeCf8911713C1";

  async function main() {
    const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
    console.log(accounts);
    const provider1 = new ethers.BrowserProvider(window.ethereum);
    console.log(provider1);
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

    const signer1 = await provider1.getSigner(accounts[0]);
    const signer2 = await provider1.getSigner(accounts[1]);
    setSigner2(signer2);
    console.log("sdsdsdsd",signer2)
    setSigner(signer1);
    const crowdFundContract = new ethers.Contract(contractAddress, abi, signer1);
    const crowdFundContrac2 = new ethers.Contract(contractAddress, abi, signer2);
    setContract2(crowdFundContrac2)
    setContract(crowdFundContract);
  }

  async function handleBalanceCheck() {
    const balanceAll = await contract.checkAllFunds();
    setBalance(balanceAll.toString());
    console.log(balanceAll.toString());
  }

  async function handleYourBalance() {
    const yourFunds = await contract.checkYourFunds("0x457124f461616c514EFd2A182526e630B4bE3c4b");
    setYourBalance(yourFunds)
    console.log(yourFunds);
  }

  async function handleSetFund(){
    const txn = await contract2.setFund({value: ethers.parseUnits("0.00001", 18)})
    await txn.wait()
    console.log(txn)
  }

  async function withdrawAll() {
    const txn = await contract2.withdrawlAll();
    await txn.wait()
    console.log(txn)
  }



  return (
    <>
    <button onClick={main}>Connect Wallet</button>
      <button onClick={handleBalanceCheck}>Get Balance</button>
      <button onClick={handleYourBalance}>Get Your Balance</button>
      <button onClick={handleSetFund}>Donate the crowdFund</button>
      <h1>Total Balance{balance}</h1>
      <h1>Total Balance{yourBalance}</h1>
    </>
  );
}

export default Crowdfund;
