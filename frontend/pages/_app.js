import { useEffect, useState } from "react";
import EvidenceManagementSystem from "@/build/contracts/EvidenceManagementSystem.json";
import "@/styles/globals.css";
import Web3 from "web3";

export default function App({ Component, pageProps }) {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState();

  useEffect(() => {
    loadWeb3();
  }, []);

  async function loadWeb3() {
    const web3 = new Web3("HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[1]);

    const networkData = EvidenceManagementSystem.networks[5777];

    if (networkData) {
      const contract = new web3.eth.Contract(EvidenceManagementSystem.abi, networkData.address);
      console.log(await contract.methods.admin().call());
      console.log(await contract.methods.getCases(account).call());
      console.log(account);
      setContract(contract);
    } else {
      window.alert("Contract not deployed to the detected network!");
    }
  }

  return <Component {...pageProps} />;
}
