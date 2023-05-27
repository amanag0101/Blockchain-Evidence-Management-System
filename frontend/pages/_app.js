import { useEffect, useState, createContext } from "react";
import EvidenceManagementSystem from "@/build/contracts/EvidenceManagementSystem.json";
import "@/styles/globals.css";
import Web3 from "web3";

export const AppContext = createContext();

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
      const contract = new web3.eth.Contract(
        EvidenceManagementSystem.abi,
        networkData.address
      );
      setContract(contract);
    } else {
      window.alert("Contract not deployed to the detected network!");
    }
  }

  return (
    <AppContext.Provider
      value={{
        account,
        contract
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
