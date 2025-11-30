import react from "react";
import { ethers } from "ethers";
import { useState } from "react";

function Crowdfund() {
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [signer2, setSigner2] = useState(null);
  const [contract, setContract] = useState(null);
  const [contract2, setContract2] = useState(null);
  const [yourBalance, setYourBalance] = useState(null);
  const [accounts, setAccounts] = useState(null);

  const contractAddress = "0x5D6A7dd379D2b0015CCEE863AB9FeCf8911713C1";

  async function main() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    setAccounts(accounts[0]);
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
    setSigner(signer1);
    const crowdFundContract = new ethers.Contract(
      contractAddress,
      abi,
      signer1
    );
    const crowdFundContrac2 = new ethers.Contract(
      contractAddress,
      abi,
      signer2
    );
    setContract2(crowdFundContrac2);
    setContract(crowdFundContract);
  }

  async function handleBalanceCheck() {
    const balanceAll = await contract.checkAllFunds();
    setBalance(balanceAll.toString());
    console.log(balanceAll.toString());
  }

  async function handleYourBalance() {
    const yourFunds = await contract.checkYourFunds(provider.getAddress());
    setYourBalance(yourFunds);
    console.log(yourFunds);
  }

  async function handleSetFund(e) {
    const txn = await contract2.setFund({
      value: ethers.parseUnits(e.value, 18),
    });
    await txn.wait();
    console.log(txn);
  }

  async function withdrawAll() {
    const txn = await contract2.withdrawlAll();
    await txn.wait();
    console.log(txn);
  }

  function shortenAddress(addr) {
    if (!addr) return "";
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  }

  return (
    <>
      <nav class="navbar bg-body-tertiary">
        <form class="container-fluid justify-content-start">
          <button
            class="btn btn-outline-success me-2"
            onClick={main}
            type="button"
          >
            Connect Wallet
          </button>
          <button
            class="btn btn-sm btn-outline-secondary m-3"
            onClick={handleBalanceCheck}
            type="button"
          >
            Get Balance
          </button>
          <button
            class="btn btn-sm btn-outline-secondary"
            onClick={handleYourBalance}
            type="button"
          >
            Get Your Balance
          </button>
          <h5 className="ms-5">{shortenAddress(accounts)}</h5>
        </form>
      </nav>
      <div className="position-absolute top-50 start-50 translate-middle">
        <div class="input-group mb-3 mt-5">
          <img className="rounded mx-auto d-block" src="./fund.jpg"/>
          <span class="input-group-text">₹</span>

          <input
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest rupees)"
          />
          <span class="input-group-text">.00</span>
        </div>
        <button className="btn btn-outline-danger m-3" onClick={handleSetFund}>
          Donate the crowdFund
        </button>
        <button className="btn btn-outline-danger" onClick={withdrawAll}>
          Withdraw All
        </button>
      </div>
      <div class="position-absolute top-100 start-50 translate-middle">
        <h3>Total Balance{balance}</h3>
        <h3>Your Total Balance{yourBalance}</h3>
      </div>
    </>
  );
}

export default Crowdfund;
