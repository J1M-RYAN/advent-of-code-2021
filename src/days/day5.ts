import { readLines, getReaderForDay, Day } from "../utils/index.ts";

type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type Lines = Set<Line>;

type GridOptions = number | ".";

type Grid = GridOptions[][];

const getMaxXandY = (lines: Lines): [number, number] => {
  let maxX = 0;
  let maxY = 0;
  for (const line of lines) {
    maxX = Math.max(maxX, Math.max(line.x1, line.x2));
    maxY = Math.max(maxY, Math.max(line.y1, line.y2));
  }
  return [maxX, maxY];
};

const inputLineToLine = (inputLine: string): Line => {
  let pointsStrings = inputLine.split("->");
  pointsStrings = pointsStrings.map((pointString) => pointString.trim());
  const [[x1, y1], [x2, y2]] = pointsStrings.map((pointsString) => {
    const numStrings = pointsString.split(",");
    const nums = numStrings.map(Number);
    return nums;
  });
  return { x1, y1, x2, y2 };
};
const createGrid = (maxX: number, maxY: number): Grid => {
  const grid: Grid = [];
  for (let i = 0; i <= maxY; i++) {
    grid.push([...Array(maxX + 1).fill(".")]);
  }
  return grid;
};

const calculateNumberOfDangerousAreas = (grid: Grid): number => {
  let total = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const gridValue = grid[y][x];
      if (!(gridValue === 1 || gridValue === ".")) {
        total++;
      }
    }
  }
  return total;
};

const getPointsLineCrosses = (line: Line): [number, number][] => {
  const crosses: [number, number][] = [];
  if (line.x1 === line.x2) {
    let nextY = Math.min(line.y1, line.y2);
    const maxY = Math.max(line.y1, line.y2);
    while (nextY <= maxY) {
      crosses.push([line.x1, nextY++]);
    }
  } else if (line.y1 === line.y2) {
    let nextX = Math.min(line.x1, line.x2);
    const maxX = Math.max(line.x1, line.x2);
    while (nextX <= maxX) {
      crosses.push([nextX++, line.y1]);
    }
  } else {
    const isPositive = line.y2 > line.y1;
    const isForwards = line.x2 > line.x1;
    if (isPositive && isForwards) {
      let nextX = line.x1;
      let nextY = line.y1;
      const maxX = line.x2;
      while (nextX <= maxX) {
        crosses.push([nextX++, nextY++]);
      }
    } else if (isPositive && !isForwards) {
      let nextX = line.x1;
      let nextY = line.y1;
      const minX = line.x2;
      while (nextX >= minX) {
        crosses.push([nextX--, nextY++]);
      }
    } else if (!isPositive && isForwards) {
      let nextX = line.x1;
      let nextY = line.y1;
      const maxX = line.x2;
      while (nextX <= maxX) {
        crosses.push([nextX++, nextY--]);
      }
    } else if (!isPositive && !isForwards) {
      let nextX = line.x1;
      let nextY = line.y1;
      const minX = line.x2;
      while (nextX >= minX) {
        crosses.push([nextX--, nextY--]);
      }
    }
  }
  return crosses;
};
const addPointsToGrid = (grid: Grid, points: [number, number][]) => {
  for (const point of points) {
    const [x, y] = point;
    if (grid[y][x] === ".") {
      grid[y][x] = 0;
    }
    if (grid[y][x] !== ".") {
      grid[y][x] = +grid[y][x] + 1;
    }
  }
};

const day = async (day: Day): Promise<number> => {
  const lines: Lines = new Set();
  const rl = readLines(await getReaderForDay(day));
  for await (const line of rl) {
    lines.add(inputLineToLine(line));
  }
  const [maxX, maxY] = getMaxXandY(lines);
  const grid = createGrid(maxX, maxY);
  for (const line of lines) {
    const pointsLineCrosses = getPointsLineCrosses(line);
    addPointsToGrid(grid, pointsLineCrosses);
  }
  return calculateNumberOfDangerousAreas(grid);
};

export default day;
