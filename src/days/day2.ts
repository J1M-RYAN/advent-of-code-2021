import { readLines, getReaderForDay, Day } from "../utils/index.ts";

type Location = {
  horizontal: number;
  depth: number;
  aim: number;
};

type Direction = "forward" | "down" | "up";

type Command = {
  direction: Direction;
  distance: number;
};

const day = async (day: Day): Promise<number> => {
  const fileReader = await getReaderForDay(day);
  const rl = readLines(fileReader);
  const location: Location = { horizontal: 0, depth: 0, aim: 0 };

  for await (const line of rl) {
    const command: Command = {
      direction: line.split(" ")[0] as Direction,
      distance: Number(line.split(" ")[1]),
    };
    if (day.part === 1) {
      switch (command.direction) {
        case "forward":
          location.horizontal += command.distance;
          break;
        case "down":
          location.depth += command.distance;
          break;
        case "up":
          location.depth -= command.distance;
          break;
      }
    } else if (day.part === 2) {
      switch (command.direction) {
        case "forward":
          location.horizontal += command.distance;
          location.depth += location.aim * command.distance;
          break;
        case "down":
          location.aim += command.distance;
          break;
        case "up":
          location.aim -= command.distance;
          break;
      }
    }
  }
  return location.horizontal * location.depth;
};

export default day;
