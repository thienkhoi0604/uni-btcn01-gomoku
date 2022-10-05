import Card from "../UI/Card/Card";
import "./History.style.css";

const History = ({ currentValue, history }) => {
  return (
    <Card className="history">
      <h2 style={{ padding: "10px", width: "170px" }}>History</h2>
      <ul>
        {history.map((item, index) => {
          if (item.row === currentValue.row && item.col === currentValue.col) {
            return (
              <li
                key={index}
                style={{ fontWeight: "bold" }}
                className="history-item"
              >
                <span className="row">row: {item.row}</span>
                <span>col: {item.col}</span>
              </li>
            );
          }
          return (
            <li key={index} className="history-item">
              <span className="row">row: {item.row}</span>
              <span>col: {item.col}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default History;
