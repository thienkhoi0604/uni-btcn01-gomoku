import "./Board.style.css";

import { useState } from "react";
import Square from "../Square/Square";
import History from "../History/History";
import Button from "../UI/Button/Button";

const Board = () => {
  const ROWS = 20;
  let newArray = Array(ROWS)
    .fill()
    .map((x) => Array(ROWS).fill("+"));

  const [isWhite, setIsWhite] = useState(true);
  const [board, setBoard] = useState(newArray);
  const [history, setHistory] = useState([]);
  const [currentValue, setCurrentValue] = useState({});

  const checkDraw = (grid) => {
    const result = grid
      .map((element) => element.filter((square) => square === "+"))
      .filter((square) => square.length);

    return result.length;
  };

  const handleReset = () => {
    setIsWhite(true);
    setBoard(newArray);
    setHistory([]);
  };

  const sortAscending = (firstItem, secondItem) => {
    if (firstItem.row === secondItem.row) {
      return firstItem.col - secondItem.col;
    } else {
      return firstItem.row > secondItem.row ? 1 : -1;
    }
  };

  const handleSortAscending = () => {
    let prevHistory = history.slice();
    prevHistory.sort(sortAscending);
    setHistory(prevHistory);
  };

  const handleSortDescending = () => {
    let prevHistory = history.slice();
    prevHistory.sort(sortAscending);
    prevHistory.reverse();
    setHistory(prevHistory);
  };

  const handleClick = (x, y) => {
    if (board[x][y] === "+") {
      const grid = board;
      let history_temp = history;

      grid[x][y] = isWhite === true ? "w" : "b";
      //history_temp.push({ col: x + 1, row: y + 1 });
      history_temp = [{ col: x + 1, row: y + 1 }, ...history_temp];

      setCurrentValue({ col: x + 1, row: y + 1 });
      setHistory(history_temp);
      setIsWhite(!isWhite);
      setBoard(grid);

      if (!checkDraw(grid)) {
        setTimeout(() => {
          alert("Draw");
          handleReset();
        }, 1);
      } else {
        //Do nothing
      }

      const checkDir = (x_temp, y_temp, color) => {
        let tracked = 0;
        let x_curr = x;
        let y_curr = y;
        while (grid[x_curr] !== undefined && grid[x_curr][y_curr] === color) {
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
          handleReset();
        }, 1);
      } else {
        //Do nothing
      }

      if (
        b_horizontal >= 5 ||
        b_vertical >= 5 ||
        b_diag1 >= 5 ||
        b_diag2 >= 5
      ) {
        setTimeout(() => {
          alert("black wins");
          handleReset();
        }, 1);
      } else {
        //Do nothing
      }
    } else {
      //Do nothing
    }
  };

  const g = board;
  const grid = board.map((row, i) => {
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
      <History currentValue={currentValue} history={history} />
      <Button onClick={handleReset}>Reset game</Button>
      <Button onClick={handleSortAscending}>Sort ASC</Button>
      <Button onClick={handleSortDescending}>Sort DESC</Button>
    </div>
  );
};

export default Board;
