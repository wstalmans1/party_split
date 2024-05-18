import { ethers } from 'ethers';
import ContractABI from './contractABI.json';

const contractAddress = '0xF98569F595Df44242c34329c6F4d17221c71107b';

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
