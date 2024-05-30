import { useState, useEffect } from 'react';
import { connectMetamask, listenForAccountChanges } from './connectMetamask';
import { getTotalDeposits, rsvp, payBill } from './contractUtils.js';
//import { getCount} from './contractUtils.js';
//import { incrementCount} from './contractUtils.js';
//import { decrementCount} from './contractUtils.js';
import './App.css';
import { contractAddress } from './contractUtils.js';

function App() {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  const [venueAddress, setVenueAddress] = useState('');
  const [billAmount, setBillAmount] = useState('');
  //const [count, setCount] = useState(null);
  //const [loading, setLoading] = useState(false); //added loading state

  // Metamask
  async function handleConnectMetamask() {
    if (connectedAccount) {
      alert(`You're already connected with the account ${connectedAccount}. If you would like to connect another account, then go to Metamask and disconnect the current account first.`);
      return;
    }
    try {
      const account = await connectMetamask();
      setConnectedAccount(account);
      listenForAccountChanges(setConnectedAccount);
      fetchBalance();
    } catch (error) {
      alert(error.message);
    }
  }

  // Interact with smart contract, get values, send transactions
  // Get the value of total balance in the contract
  async function fetchBalance() {
    try {
      const balanceValue = await getTotalDeposits();
      setBalance(balanceValue);
      console.log(balanceValue);
    } catch (error) {
      console.error('error fetching balance:', error);
    }
    //setLoading(false); // Stop loading after fetching
  }

  // RSVP trasnaction
  async function handleRSVP() {
    if (!connectedAccount) {
      alert('Please connect to Metamask first');
      return;
    }
    setLoading(true);
    try {
      const txHash = await rsvp();
      setTransactionHash(txHash);
      alert(`Transaction successful with hash: ${txHash}`);
      fetchBalance(); //refresh balance after RSVP
    } catch (error) {
      alert(`Transaction failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

// Pay Bill transaction
async function handlePayBill() {
  if (!connectedAccount) {
    alert('Please connect to Metamask first');
    return;
  }
  if (!venueAddress || !billAmount) {
    alert('Please enter both venue address and bill amount');
    return;
  }
  setLoading(true);
  try {
    const txHash = await payBill(venueAddress, billAmount);
    setTransactionHash(txHash);
    alert(`Transaction successful with hash: ${txHash}`);
    fetchBalance(); // refresh balance after paying bill
  } catch (error) {
    alert(`Transaction failed: ${error.message}`);
  } finally {
    setLoading(false);
  }
}


  // Get the value of the variable "count"
  /*
  async function fetchCount() {
    const countValue = await getCount();
    setCount(countValue.toString());
    setLoading(false); // Stop loading after fetching
  }
  */


  /*
  // Increment the value of the variable "count"
  async function handleIncrement() {
    if(!connectedAccount) {
      alert('Please connect to Metamask first');
      return;
    }
    //setLoading(true); // Start loading before the transaction
    await incrementCount();
    fetchBalance(); // Refresh the count after increment
  }
  */
  

  /*
  // Decrement the value of the variable "count"
  async function handleDecrement() {
    if(!connectedAccount) {
      alert('Please connect to Metamask first');
      return;
    }
    //setLoading(true); // Start loading before the transaction
    await decrementCount();
    fetchBalance();
  }
  */
  

  useEffect(() => {
    if(connectedAccount) {
      fetchBalance();
    }
  }, [connectedAccount]);

  // This line was causing a dependency problem. I excluded it from the return function here below. It was positioned below "<p>Contract Balance: {balance !== null ? balance : 'Loading...'}</p>" and above "<button onClick={handleIncrement}>Increment</button>"
  //    <p>Contract Balance: {balance !== null ? balance : 'Loading...'}</p>
  //    {loading && <p>Waiting for your latest transaction to be inserted in a block...</p>}      

  return (
    <header className="App-header">
        <button onClick={handleConnectMetamask}>Connect to Metamask</button>
        <p>Connected account: {connectedAccount ? connectedAccount : 'Not connected'}</p>
        <p>Contract address: {contractAddress} </p>       
        <p>Contract Balance: {balance !== null ? balance : 'loading...'} </p>
        {loading && <p>Waiting for your transaction to be confirmed...</p>}
        <button onClick={handleRSVP}>Click here to send 0.01 ETH to the partysplit contract</button>
        <p>Transaction Hash: {transactionHash} </p>
        <div>
          <h3>Pay Bill</h3>
          <input type="text" placeholder="Venue Address" value={venueAddress} onChange={(e) => setVenueAddress(e.target.value)} />
          <input type="text" placeholder="Bill Amount" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} />
          <button onClick={handlePayBill} >Pay Bill</button>
        </div>
        { /* <button onClick={handleIncrement}>Increment</button> */ }
        { /* <button onClick={handleDecrement}>Decrement</button> */ }
    </header>
  );
}

export default App;