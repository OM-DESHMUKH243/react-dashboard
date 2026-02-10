import Card from "./Card";

function Dashboard({ btc, eth, sol, getPrices, loading }) {
  return (
    <div style={{ textAlign:"center", paddingTop:"50px", color:"white" }}>
      <h1>Crypto Prices</h1>

      <button 
        onClick={getPrices}
        style={{
          padding:"14px 25px",
          fontSize:"18px",
          background:"#ff9800",
          border:"none",
          borderRadius:"8px",
          cursor:"pointer",
          marginTop:"20px"
        }}>
        Fetch Prices
      </button>

      {loading && <h2>Loading...</h2>}

      <div style={{
        display:"flex",
        justifyContent:"center",
        gap:"40px",
        marginTop:"60px"
      }}>
        <Card title="Bitcoin" price={btc} />
        <Card title="Ethereum" price={eth} />
        <Card title="Solana" price={sol} />
      </div>
    </div>
  );
}

export default Dashboard;
