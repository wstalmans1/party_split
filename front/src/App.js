import { useState, useEffect } from 'react';
import { connectMetamask, listenForAccountChanges } from './connectMetamask';
import { getTotalDeposits} from './contractUtils.js';
//import { getCount} from './contractUtils.js';
//import { incrementCount} from './contractUtils.js';
//import { decrementCount} from './contractUtils.js';
import './App.css';
import Apptest from './learningReactComponents.js';


function App() {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [balance, setBalance] = useState(null);
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
    const balanceValue = await getTotalDeposits();
    setBalance(balanceValue.toString());
    //setLoading(false); // Stop loading after fetching
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
        <p>{connectedAccount ? connectedAccount : 'Not connected'}</p>

        { /* <button onClick={handleIncrement}>Increment</button> */ }
        <p></p>
        { /* <button onClick={handleDecrement}>Decrement</button> */ }
        <Apptest />
    </header>
  );
}

export default App;