import { ethers } from "ethers";

export async function connectMetamask() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return address;
  } else {
    throw new Error('Please download Metamask');
  }
}

export function listenForAccountChanges(setConnectedAccount) {
  window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length > 0) {
      const address = accounts[0];
      setConnectedAccount(address);
    } else {
      setConnectedAccount(null);
    }
  });
}
