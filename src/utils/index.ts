import { readLines } from "https://deno.land/std/io/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
export type Day = {
  day: number;
  part: 1 | 2;
  isSample: boolean;
};
const getReaderForDay = async (day: Day): Promise<Deno.File> => {
  const filename = path.join(
    Deno.cwd(),
    `./src/data/${day.isSample ? "sample" : ""}${day.day}.txt`
  );
  const fileReader = await Deno.open(filename);

  return fileReader;
};

const printDataForDay = async (day: Day) => {
  const fileReader = await getReaderForDay(day);
  for await (const line of readLines(fileReader)) {
    console.log(line);
  }
};

export { readLines, printDataForDay, getReaderForDay };
