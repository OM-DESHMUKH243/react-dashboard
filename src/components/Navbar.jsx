function Navbar({ wallet, connectWallet }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "20px 40px",
      background: "#161b22",
      color: "white"
    }}>
      <h2>⚡ Solana Dashboard</h2>

      <button 
        onClick={connectWallet}
        style={{
          padding: "10px 18px",
          background: "#9945FF",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
        {wallet}
      </button>
    </div>
  );
}

export default Navbar;
