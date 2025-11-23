import react from "react";
import {ethers} from 'ethers'

async function Crowdfund() {
    const contractAddress = "0xF27374C91BF602603AC5C9DaCC19BE431E3501cb"
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    console.log(signer)

  return <h1>Hello Shivam</h1>;
}

export default Crowdfund;
