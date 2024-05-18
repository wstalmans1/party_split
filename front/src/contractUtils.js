import { ethers } from 'ethers';
import ContractABI from './contractABI.json';

const contractAddress = '0xb50159b650d32B5cEAC822D73aF50F333Dd7B007';

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

/*
export async function getCount() {
  const provider = await getWeb3Provider();
  const contract = getContract(provider);
  const count = await contract.get(); // assumes "get" in ABI
  return count.toNumber(); // convert BigNumber to number
}

export async function incrementCount() {
  const provider = await getWeb3Provider();
  const contract = getContract(provider);
  const tx = await contract.inc(); // assumes "inc" in ABI
  await tx.wait(); // wait for transaction confirmation
  return tx.hash; // return transaction hash
}

export async function decrementCount() {
  const provider = await getWeb3Provider();
  const contract = getContract(provider);
  const tx = await contract.decr(); // assumes "decr" in ABI
  await tx.wait(); // wait for transaction confirmation
  return tx.hash; // return transaction hash
}
*/