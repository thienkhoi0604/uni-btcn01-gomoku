import "./Board.style.css";

import { useState } from "react";
import Square from "../Square/Square";

const Board = () => {
  const ROWS = 20;
  let newArray = Array(ROWS)
    .fill()
    .map((x) => Array(ROWS).fill("+"));

  const [isWhite, setIsWhite] = useState(true);
  const [board, setBoard] = useState(newArray);
  const [history, setHistory] = useState([]);

  const handleReset = () => {
    setIsWhite(true);
    setBoard(newArray);
    setHistory([]);
  };

  const handleClick = (x, y) => {
    if (board[x][y] === "+") {
      const g = board;
      const history_temp = history;

      g[x][y] = isWhite === true ? "w" : "b";
      history_temp.push(x + 1 + "__" + (y + 1));

      setHistory(history_temp);
      setIsWhite(!isWhite);
      setBoard(g);

      const checkDir = (x_temp, y_temp, color) => {
        let tracked = 0;
        let x_curr = x;
        let y_curr = y;
        while (g[x_curr] !== undefined && g[x_curr][y_curr] === color) {
          tracked += 1;
          y_curr += y_temp;
          x_curr += x_temp;
        }
        return tracked;
      };

      const w_horizontal = checkDir(0, 1, "w") + checkDir(0, -1, "w") - 1;
      const b_horizontal = checkDir(0, 1, "b") + checkDir(0, -1, "b") - 1;

      const w_vertical = checkDir(1, 0, "w") + checkDir(-1, 0, "w") - 1;
      const b_vertical = checkDir(1, 0, "b") + checkDir(-1, 0, "b") - 1;

      const w_diag1 = checkDir(1, 1, "w") + checkDir(-1, -1, "w") - 1;
      const b_diag1 = checkDir(1, 1, "b") + checkDir(-1, -1, "b") - 1;

      const w_diag2 = checkDir(1, 1, "w") + checkDir(-1, -1, "w") - 1;
      const b_diag2 = checkDir(-1, 1, "b") + checkDir(1, -1, "b") - 1;

      if (
        w_horizontal >= 5 ||
        w_vertical >= 5 ||
        w_diag1 >= 5 ||
        w_diag2 >= 5
      ) {
        setTimeout(() => {
          alert("white wins");
        }, 1);
      }

      if (
        b_horizontal >= 5 ||
        b_vertical >= 5 ||
        b_diag1 >= 5 ||
        b_diag2 >= 5
      ) {
        setTimeout(() => {
          alert("black wins");
        }, 1);
      }
    } else {
      //Do nothing
    }
  };

  const g = board;
  const grid = g.map((row, i) => {
    return (
      <div key={"row_" + i}>
        {row.map((col, j) => {
          const color =
            g[i][j] === "+" ? "#e4b97e" : g[i][j] === "w" ? "white" : "black";

          return (
            <Square
              handleClick={() => handleClick(i, j)}
              color={color}
              key={i + "_" + j}
            />
          );
        })}
      </div>
    );
  });

  return (
    <div className="board">
      {grid}
      <div>
        <button
          onClick={handleReset}
          style={{ height: "30px", width: "100px", margin: "20px" }}
        >
          Reset game
        </button>
      </div>
      <div className="history">
        History
        <ul>
          {history.map((item, index) => {
            if (index === history.length - 1) {
              console.log("checked");
              return (
                <li key={index} style={{ fontWeight: "bold" }}>
                  {item}
                </li>
              );
            }
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Board;
