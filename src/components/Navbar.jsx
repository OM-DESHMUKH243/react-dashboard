function Navbar({ wallet, connectWallet }) {
  const shortWallet =
    wallet.length > 20
      ? wallet.slice(0, 4) + "..." + wallet.slice(-4)
      : wallet;

  function handleClick() {
    connectWallet();

    if (wallet.length > 20) {
      navigator.clipboard.writeText(wallet);
      alert("Wallet address copied 📋");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 40px",
        background: "#161b22",
        color: "white",
        alignItems: "center",
      }}
    >
      <h2>⚡ Solana Dashboard</h2>

      <button
        onClick={handleClick}
        style={{
          padding: "10px 18px",
          background: "#9945FF",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        {shortWallet}
      </button>
    </div>
  );
}

export default Navbar;
