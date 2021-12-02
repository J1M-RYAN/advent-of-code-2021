import { readLines, getReaderForDay, Day } from "../utils/index.ts";

const day = async (day: Day): Promise<number> => {
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
      const total = counts.reduce((a, b) => a + b, 0);
      const sumA = total - counts[3];
      const sumB = total - counts[0];
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

export default day;
