import { useState, useEffect } from 'react';
import { connectMetamask, listenForAccountChanges } from './connectMetamask';
import { getCount, incrementCount, decrementCount} from './contractUtils.js';
import './App.css';


function App() {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false); //added loading state

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
      fetchCount();
    } catch (error) {
      alert(error.message);
    }
  }

  // Get the value of the variable "count"
  async function fetchCount() {
    const countValue = await getCount();
    setCount(countValue.toString());
    setLoading(false); // Stop loading after fetching
  }

  // Increment the value of the variable "count"
  async function handleIncrement() {
    if(!connectedAccount) {
      alert('Please connect to Metamask first');
      return;
    }
    setLoading(true); // Start loading before the transaction
    await incrementCount();
    fetchCount(); // Refresh the count after increment
  } 

  // Decrement the value of the variable "count"
  async function handleDecrement() {
    if(!connectedAccount) {
      alert('Please connect to Metamask first');
      return;
    }
    setLoading(true); // Start loading before the transaction
    await decrementCount();
    fetchCount();
  }

  useEffect(() => {
    if(connectedAccount) {
      fetchCount();
    }
  }, [connectedAccount]);

  return (
    <header className="App-header">
        <button onClick={handleConnectMetamask}>Connect to Metamask</button>
        <p>{connectedAccount ? connectedAccount : 'Not connected'}</p>
        <p>Count: {count !== null ? count : 'Loading...'}</p>
        {loading && <p>Waiting for your latest transaction to be inserted in a block...</p>}      
        <button onClick={handleIncrement}>Increment</button>
        <p></p>
        <button onClick={handleDecrement}>Decrement</button>    
    </header>
  );
}

export default App;