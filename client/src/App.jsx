import { useState, useEffect } from 'react'
import abi from "./contractJson/chai.json"
import { ethers } from "ethers"
import Memos from './components/Memos'
import Buy from './components/Buy'
import chaichaska from "./chaichaska.png";
import './App.css'

function App() {
  const [state, setState] = useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [account , setAccount ] = useState ('Not connected');
  useEffect(() => {

    const template = async()=>{

      const contractAddress="0x7d132b173f66E6858bc1545366D175D47C8974E1";
      const contractABI=abi.abi;
      // Metamask part
      //Metamask consit of infura api which hel in connecting to the blockchain

      try{
        const {ethereum} = window;
        const account = await ethereum.request ( {
          method : "eth_requestAccounts"
        })


        window.ethereum.on("accountsChanged",()=> {
          window.location.reload()
        })
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);//read the Blockchain
        const signer =  provider.getSigner(); //write the blockchain
  
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        console.log(contract)
        
      setState({provider,signer,contract});

      } catch(error) {
        console.log(error)
      }
     
    }
    template();
  }, [])                         

  return (
    <div >
    <img src={chaichaska} className="img-fluid" alt=".." width="100%" />
    <p style={{ marginTop: "10px", marginLeft: "5px" }}>
      <small>Connected Account - {account}</small>
    </p>
   
      <Buy state={state} />
      <Memos state={state} />
   
  </div>
  )
}


export default App
