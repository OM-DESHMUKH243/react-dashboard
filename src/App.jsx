import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";

function App() {
  const [btc, setBtc] = useState("-");
  const [eth, setEth] = useState("-");
  const [sol, setSol] = useState("-");
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState("Connect Wallet");
  const [balance, setBalance] = useState(null);

  // ================= FETCH CRYPTO PRICES =================
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

  // ================= CONNECT WALLET =================
  async function connectWallet() {
    try {
      const { solana } = window;

      if (solana && solana.isPhantom) {
        const response = await solana.connect();
        const walletAddress = response.publicKey.toString();
        setWallet(walletAddress);

        const connection = new Connection(clusterApiUrl("devnet"));
        const publicKey = new PublicKey(walletAddress);
        const walletBalance = await connection.getBalance(publicKey);

        const solBalance = walletBalance / 1000000000;
        setBalance(solBalance.toFixed(2));
      } else {
        alert("Phantom wallet not found");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // ================= SEND SOL =================
  async function sendSol() {
    try {
      const { solana } = window;

      if (!solana) {
        alert("Install Phantom");
        return;
      }

      const connection = new Connection(clusterApiUrl("devnet"));
      const fromPubkey = solana.publicKey;
      const toPubkey = new PublicKey(fromPubkey.toString());

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: 0.01 * 1000000000,
        })
      );

      transaction.feePayer = fromPubkey;
      let blockhashObj = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhashObj.blockhash;

      const signed = await solana.signTransaction(transaction);
      await connection.sendRawTransaction(signed.serialize());

      alert("✅ Transaction Successful!");
    } catch (err) {
      console.log(err);
      alert("Transaction failed");
    }
  }

  // ================= UI =================
  return (
    <div style={{ background: "#0d1117", minHeight: "100vh" }}>
      <Navbar wallet={wallet} connectWallet={connectWallet} />

      {balance && (
        <>
          <h2 style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
            💰 Balance: {balance} SOL
          </h2>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={sendSol}
              style={{
                padding: "12px 25px",
                fontSize: "16px",
                background: "#00c853",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Send 0.01 SOL (Test)
            </button>
          </div>
        </>
      )}

      <Dashboard
        btc={btc}
        eth={eth}
        sol={sol}
        getPrices={getPrices}
        loading={loading}
      />
    </div>
  );
}

export default App;
