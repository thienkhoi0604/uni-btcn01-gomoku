import "./Square.style.css";

const Square = ({ handleClick, color }) => {
  return (
    <div className="square" onClick={handleClick}>
      <div
        style={{
          color: color,
          border: "1px solid",
          backgroundColor: color,
          borderRadius: "50%",
          borderColor: color,
          height: 25,
        }}
      ></div>
    </div>
  );
};

export default Square;
