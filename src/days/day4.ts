import { readLines, getReaderForDay, Day } from "../utils/index.ts";
type BingoStatus = number | "removed";
type BingoBoard = BingoStatus[][];
type Boards = BingoBoard[];

const calculateTotal = (board: BingoBoard): number => {
  let total = 0;
  for (const row of board) {
    for (const item of row) {
      if (item != "removed") {
        total += item;
      }
    }
  }
  return total;
};

const skipLine = async (rl: AsyncIterableIterator<string>): Promise<void> => {
  await rl.next();
};
const getCol = (board: BingoBoard, col: number): BingoStatus[] => {
  const column: BingoStatus[] = [];
  for (let i = 0; i < board.length; i++) {
    column.push(board[i][col]);
  }
  return column;
};
const boardWin = (board: BingoBoard): boolean => {
  for (const row of board) {
    if (row.every((val) => val === "removed")) {
      return true;
    }
  }

  for (let i = 0; i < board.length; i++) {
    const col = getCol(board, i);
    if (col.every((val) => val === "removed")) {
      return true;
    }
  }
  return false;
};

const readBingoBoard = async (
  rl: AsyncIterableIterator<string>
): Promise<BingoBoard> => {
  const bingoBoard: BingoBoard = [];
  for (let i = 0; i < 5; i++) {
    const line = await (await rl.next()).value;
    if (line) {
      bingoBoard.push(
        line
          .trim()
          .split(/(\s+)/)
          .filter((char: string) => char != " " && char != "  ")
          .map((num: string) => Number(num))
      );
    }
  }
  await skipLine(rl);

  return bingoBoard;
};
const day = async (day: Day): Promise<number> => {
  const fileReader = await getReaderForDay(day);
  const rl = readLines(fileReader);
  let boards: Boards = [];
  const firstLine: string = await (await rl.next()).value;
  const calledOutNums: number[] = firstLine
    .split(",")
    .map((num) => Number(num));
  await skipLine(rl);
  while (true) {
    const bingoBoard = await readBingoBoard(rl);
    if (bingoBoard.length === 0) {
      break;
    }
    boards.push(bingoBoard);
  }

  let j = 0;
  if (day.part === 1) {
    while (true) {
      const currentNum = calledOutNums[j++];
      for (const board of boards) {
        for (const set of board) {
          if (set.includes(currentNum)) {
            const index = set.indexOf(currentNum);
            if (index > -1) {
              set.splice(index, 1);
            }
          }
          if (boardWin(board)) {
            const unmarkedSum = calculateTotal(board);
            return unmarkedSum * currentNum;
          }
        }
      }
    }
  } else if (day.part === 2) {
    while (true) {
      const currentNum = calledOutNums[j++];
      console.log("calledOutNum", currentNum);
      for (const board of boards) {
        for (const set of board) {
          if (set.includes(currentNum)) {
            const index = set.indexOf(currentNum);
            if (index > -1) {
              set[index] = "removed";
              break;
            }
          }
          if (boardWin(board)) {
            console.log("boardWin");
            console.log(board);
            if (boards.length > 1) {
              boards = boards.filter((b) => b !== board);
              console.log("removed board printed above");
            } else {
              console.log("final board total", calculateTotal(boards[0]));
              console.log("final calledOutNum", currentNum);
              return calculateTotal(boards[0]) * calledOutNums[j - 2];
            }
          }
        }
      }
    }
  }

  return 0;
};

export default day;
