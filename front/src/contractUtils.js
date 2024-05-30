import { ethers } from 'ethers';
import ContractABI from './contractABI.json';

export const contractAddress = '0xa684B88c72D83677015f5EcB479b346A51941044';

// The functions getWeb3Provider and getContract are not smart contract specific and can remain untouched
export async function getWeb3Provider() {
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  } else {
    throw new Error('Please download Metamask');
  }
}

export function getContract(provider) {
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, ContractABI, signer);
}

// Adapt the below functions to the specific smart contract
export async function getTotalDeposits() {
  const provider = await getWeb3Provider();
  const contract = getContract(provider);
  const totalDeposits = await contract.totalDeposits(); // call the totalDeposits function
  return ethers.utils.formatEther(totalDeposits); // convert BigNumber to string in ether format
}


export async function rsvp() {
  const provider = await getWeb3Provider();
  const contract = getContract(provider);
  const cost = await contract.cost(); // get the cost value from the contract
  const tx = await contract.rsvp({ value: cost }); // send the transaction with the value
  await tx.wait(); // wait for transaction confirmation
  return tx.hash; // return transaction hash
}


export async function payBill(venueAddress, billAmount) {
  const provider = await getWeb3Provider();
  const contract = getContract(provider);
  //const billAmountInWei = ethers.utils.parseEther(billAmount); // Convert the bill amount to Wei
  const tx = await contract.payBill(venueAddress, billAmount); // send the transaction
  await tx.wait(); // wait for transaction confirmation
  return tx.hash; // return transaction hash
}



/*
export async function checkPayment(address) {
  const provider = await getWeb3Provider();
  const contract = getContract(provider);
  const payment = await contract.payments(address); // read the payment mapping for the given address
  return ethers.utils.formatEther(payment); // convert BigNumber to string in ether format
}
*/

/*
export async function getCost() {
  const provider = await getWeb3Provider();
  const contract = getContract(provider);
  const cost = await contract.cost(); // call the cost function
  return ethers.utils.formatEther(cost); // convert BigNumber to string in ether format
}
*/

/*
export async function getCount() {
  const provider = await getWeb3Provider();
  const contract = getContract(provider);
  const count = await contract.get(); // assumes "get" in ABI
  return count.toNumber(); // convert BigNumber to number
}
*/

/*
export async function incrementCount() {
  const provider = await getWeb3Provider();
  const contract = getContract(provider);
  const tx = await contract.inc(); // assumes "inc" in ABI
  await tx.wait(); // wait for transaction confirmation
  return tx.hash; // return transaction hash
}
*/

/*
export async function decrementCount() {
  const provider = await getWeb3Provider();
  const contract = getContract(provider);
  const tx = await contract.decr(); // assumes "decr" in ABI
  await tx.wait(); // wait for transaction confirmation
  return tx.hash; // return transaction hash
}
*/
