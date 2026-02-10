import { useState } from "react";

function App() {
  const [btc, setBtc] = useState("-");
  const [eth, setEth] = useState("-");
  const [sol, setSol] = useState("-");
  const [loading, setLoading] = useState(false);

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
      console.log("Error fetching prices");
    }

    setLoading(false);
  }

  return (
    <div style={{
      backgroundColor: "#0d1117",
      minHeight: "100vh",
      color: "white",
      textAlign: "center",
      paddingTop: "60px"
    }}>
      <h1 style={{fontSize:"40px"}}>🚀 Crypto Dashboard</h1>

      <button 
        onClick={getPrices}
        style={{
          padding:"15px 30px",
          fontSize:"18px",
          backgroundColor:"#ff9800",
          border:"none",
          borderRadius:"8px",
          cursor:"pointer",
          marginTop:"20px"
        }}>
        Get Live Prices
      </button>

      {loading && <h2 style={{marginTop:"20px"}}>Fetching prices...</h2>}

      <div style={{
        display:"flex",
        justifyContent:"center",
        gap:"40px",
        marginTop:"60px"
      }}>

        <div style={cardStyle}>
          <h2>Bitcoin</h2>
          <h1>${btc}</h1>
        </div>

        <div style={cardStyle}>
          <h2>Ethereum</h2>
          <h1>${eth}</h1>
        </div>

        <div style={cardStyle}>
          <h2>Solana</h2>
          <h1>${sol}</h1>
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  background:"#161b22",
  padding:"30px",
  borderRadius:"12px",
  width:"200px",
  boxShadow:"0 0 20px rgba(255,255,255,0.1)"
};

export default App;
