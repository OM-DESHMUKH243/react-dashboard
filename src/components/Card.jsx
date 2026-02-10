function Card({ title, price }) {
  return (
    <div style={{
      background:"#161b22",
      padding:"30px",
      borderRadius:"12px",
      width:"200px",
      boxShadow:"0 0 15px rgba(255,255,255,0.1)",
      color:"white"
    }}>
      <h2>{title}</h2>
      <h1>${price}</h1>
    </div>
  );
}

export default Card;
