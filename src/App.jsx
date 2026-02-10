import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  const [btc, setBtc] = useState("-");
  const [eth, setEth] = useState("-");
  const [sol, setSol] = useState("-");
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState("Connect Wallet");

  async function getPrices() {
    setLoading(true);

    try {
      let response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"
      );

      let data = await response.json();

      setBtc(data.bitcoin.usd);
      setEth(data.ethereum.usd);
      setSol(data.solana.usd);
    } catch (error) {
      console.log("Error");
    }

    setLoading(false);
  }

  async function connectWallet() {
  try {
    const { solana } = window;

    if (solana && solana.isPhantom) {
      const response = await solana.connect();
      setWallet(response.publicKey.toString());
    } else {
      alert("Phantom wallet not found. Install it.");
    }
  } catch (err) {
    console.log(err);
  }
}


  return (
    <div style={{ background:"#0d1117", minHeight:"100vh" }}>
      <Navbar wallet={wallet} connectWallet={connectWallet} />
      <Dashboard btc={btc} eth={eth} sol={sol} getPrices={getPrices} loading={loading} />
    </div>
  );
}

export default App;
