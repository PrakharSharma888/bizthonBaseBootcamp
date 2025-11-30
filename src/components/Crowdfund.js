import React, { useState } from "react";
import { ethers } from "ethers";

function Crowdfund() {
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [signer2, setSigner2] = useState(null);
  const [contract, setContract] = useState(null);
  const [contract2, setContract2] = useState(null);
  const [yourBalance, setYourBalance] = useState(null);
  const [accounts, setAccounts] = useState(null); // will hold accounts array
  const [donationAmount, setDonationAmount] = useState("0.001");

  const contractAddress = "0x5D6A7dd379D2b0015CCEE863AB9FeCf8911713C1";

  async function main() {
    if (!window.ethereum) return alert("No Ethereum provider found. Install MetaMask.");
    try {
      const accs = await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("accounts:", accs);
      setAccounts(accs);

      const provider1 = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider1);

      const abi = [
        { inputs: [], name: "endFunding", outputs: [], stateMutability: "nonpayable", type: "function" },
        { inputs: [], name: "setFund", outputs: [], stateMutability: "payable", type: "function" },
        { inputs: [ { internalType: "uint256", name: "_endTime", type: "uint256" }, { internalType: "uint256", name: "_goalAmount", type: "uint256" } ], stateMutability: "nonpayable", type: "constructor" },
        { inputs: [ { internalType: "uint256", name: "amount", type: "uint256" } ], name: "withdrawalSomeFunds", outputs: [ { internalType: "bool", name: "", type: "bool" } ], stateMutability: "nonpayable", type: "function" },
        { inputs: [], name: "withdrawlAll", outputs: [ { internalType: "bool", name: "", type: "bool" } ], stateMutability: "nonpayable", type: "function" },
        { inputs: [], name: "checkAllFunds", outputs: [ { internalType: "uint256", name: "", type: "uint256" } ], stateMutability: "view", type: "function" },
        { inputs: [ { internalType: "address", name: "myAddress", type: "address" } ], name: "checkYourFunds", outputs: [ { internalType: "uint256", name: "", type: "uint256" } ], stateMutability: "view", type: "function" },
        { inputs: [], name: "endTime", outputs: [ { internalType: "uint256", name: "", type: "uint256" } ], stateMutability: "view", type: "function" },
        { inputs: [], name: "goalAmount", outputs: [ { internalType: "uint256", name: "", type: "uint256" } ], stateMutability: "view", type: "function" },
        { inputs: [], name: "isStarted", outputs: [ { internalType: "bool", name: "", type: "bool" } ], stateMutability: "view", type: "function" }
      ];

      const signer1 = accs && accs[0] ? await provider1.getSigner(accs[0]) : await provider1.getSigner(0);
      const signerTwo = accs && accs[1] ? await provider1.getSigner(accs[1]) : null;

      setSigner(signer1);
      setSigner2(signerTwo);

      const crowdFundContract = new ethers.Contract(contractAddress, abi, signer1);
      const crowdFundContract2 = signerTwo ? new ethers.Contract(contractAddress, abi, signerTwo) : null;

      setContract(crowdFundContract);
      setContract2(crowdFundContract2);
    } catch (err) {
      console.error(err);
      alert("Failed to connect: " + (err && err.message ? err.message : err));
    }
  }

  async function handleBalanceCheck() {
    if (!contract) return console.warn("Contract not connected");
    try {
      const balanceAll = await contract.checkAllFunds();
      setBalance(ethers.formatUnits(balanceAll, 18));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleYourBalance() {
    if (!contract) return console.warn("Contract not connected");
    const addr = accounts && accounts[0] ? accounts[0] : (signer ? await signer.getAddress() : null);
    if (!addr) return console.warn("No address available to check");
    try {
      const yourFunds = await contract.checkYourFunds(addr);
      setYourBalance(ethers.formatUnits(yourFunds, 18));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSetFund() {
    if (!contract2) return alert("Second account not connected or not available for donation");
    try {
      const value = donationAmount || "0";
      const parsed = ethers.parseUnits(value.toString(), 18);
      const txn = await contract2.setFund({ value: parsed });
      await txn.wait();
      alert("Donation sent");
    } catch (err) {
      console.error(err);
      alert("Donation failed: " + (err && err.message ? err.message : err));
    }
  }

  async function withdrawAll() {
    if (!contract2) return alert("Second account not connected or not available");
    try {
      const txn = await contract2.withdrawlAll();
      await txn.wait();
      alert("Withdrawal complete");
    } catch (err) {
      console.error(err);
      alert("Withdraw failed: " + (err && err.message ? err.message : err));
    }
  }

  function shortenAddress(addr) {
    if (!addr) return "";
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  }

  return (
    <div className="container mt-4">
      <nav className="navbar bg-body-tertiary mb-3">
        <div className="container-fluid d-flex align-items-center">
          <button className="btn btn-outline-success me-2" onClick={main} type="button">
            Connect Wallet
          </button>

          <div className="me-3">
            <strong>Account:</strong> {accounts && accounts[0] ? shortenAddress(accounts[0]) : "Not connected"}
          </div>

          <button className="btn btn-sm btn-outline-secondary me-2" onClick={handleBalanceCheck} disabled={!contract}>
            Get Balance
          </button>

          <button className="btn btn-outline-danger me-2" onClick={handleYourBalance} disabled={!contract}>
            Get Your Balance
          </button>
        </div>
      </nav>

      <div className="row">
        <div className="col-md-4 text-center">
          <img src="./fund.jpg" alt="fund" className="img-fluid img-thumbnail mb-3" style={{ maxHeight: 240 }} />

          <div className="input-group mb-3">
            <span className="input-group-text">₹</span>
            <input
              type="number"
              step="0.001"
              className="form-control"
              aria-label="Amount (to the nearest rupees)"
              value={donationAmount}
              onChange={(ev) => setDonationAmount(ev.target.value)}
            />
            <span className="input-group-text">.00</span>
          </div>

          <div>
            <button className="btn btn-danger me-2" onClick={handleSetFund} disabled={!contract2 || !donationAmount}>
              Donate
            </button>
            <button className="btn btn-outline-secondary" onClick={withdrawAll} disabled={!contract2}>
              Withdraw All
            </button>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Crowdfund Dashboard</h5>
              <p className="card-text"><strong>Total Balance:</strong> {balance ?? "-"} ETH</p>
              <p className="card-text"><strong>Your Balance:</strong> {yourBalance ?? "-"} ETH</p>
              <p className="card-text"><strong>Connected as:</strong> {accounts && accounts[0] ? accounts[0] : "-"}</p>
              <p className="card-text text-muted">Use the controls on the left to donate or withdraw (if authorized).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Crowdfund;
