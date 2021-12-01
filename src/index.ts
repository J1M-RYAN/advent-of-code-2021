import { readLines } from "https://deno.land/std/io/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
type Day = {
  day: number;
  part: number;
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

const dayOne = async (day: Day): Promise<number> => {
  const fileReader = await getReaderForDay(day);
  let count = 0;
  const rl = readLines(fileReader);
  let prevCount = Number(await (await rl.next()).value);
  if (day.part === 1) {
    for await (const line of rl) {
      const currentCount = Number(line);
      if (currentCount > prevCount) {
        count++;
      }
      prevCount = currentCount;
    }
  } else if (day.part === 2) {
    let counts: number[] = [];
    counts.push(prevCount);
    while (counts.length < 4) {
      counts.push(Number(await (await rl.next()).value));
    }
    while (true) {
      console.log(counts);
      let total = counts.reduce((a, b) => a + b, 0);
      let sumA = total - counts[3];
      let sumB = total - counts[0];
      if (sumB > sumA) {
        count++;
      }
      counts = counts.slice(1);
      const next = await rl.next();
      if (!next.done) {
        counts.push(Number(await next.value));
      } else {
        break;
      }
    }
  }

  return count;
};

console.log(await dayOne({ day: 1, isSample: false, part: 2 }));
