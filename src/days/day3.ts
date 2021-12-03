import { readLines, getReaderForDay, Day } from "../utils/index.ts";

type BinaryDigit = "0" | "1";
type Frequency = {
  countOnes: number;
  countZeroes: number;
};

const day = async (day: Day): Promise<number> => {
  const fileReader = await getReaderForDay(day);
  const rl = readLines(fileReader);
  const frequencies: Frequency[] = [];

  if (day.part === 1) {
    for await (const line of rl) {
      let i = 0;
      for (const char of line.split("") as BinaryDigit[]) {
        if (frequencies.length - 1 < i) {
          frequencies.push({ countOnes: 0, countZeroes: 0 });
        }
        switch (char) {
          case "0":
            frequencies[i].countZeroes++;
            break;
          case "1":
            frequencies[i].countOnes++;
            break;
        }
        i++;
      }
    }
    const gammaBinaryList: BinaryDigit[] = [];
    const epsilonBinaryList: BinaryDigit[] = [];

    for (const frequncy of frequencies) {
      if (frequncy.countOnes > frequncy.countZeroes) {
        gammaBinaryList.push("1");
        epsilonBinaryList.push("0");
      } else {
        gammaBinaryList.push("0");
        epsilonBinaryList.push("1");
      }
    }
    const gammaRate = parseInt(gammaBinaryList.join(""), 2);
    const epsilonRate = parseInt(epsilonBinaryList.join(""), 2);

    return gammaRate * epsilonRate;
  } else if (day.part === 2) {
    let allLinesOxygen: BinaryDigit[][] = [];
    let allLinesCO2: BinaryDigit[][] = [];

    for await (const line of rl) {
      const binaryLine = line.split("") as BinaryDigit[];
      allLinesOxygen.push(binaryLine);
      allLinesCO2.push(binaryLine);
    }

    let i = 0;
    while (i < allLinesOxygen[0].length) {
      const frequency: Frequency = { countOnes: 0, countZeroes: 0 };
      for (const line of allLinesOxygen) {
        switch (line[i]) {
          case "0":
            frequency.countZeroes++;
            break;
          case "1":
            frequency.countOnes++;
            break;
        }
      }
      const mostFrequent =
        frequency.countOnes >= frequency.countZeroes ? "1" : "0";
      allLinesOxygen = allLinesOxygen.filter(
        (line) => line[i] === mostFrequent
      );
      i++;
      if (allLinesOxygen.length === 1) {
        break;
      }
    }

    let j = 0;
    while (j < allLinesCO2[0].length) {
      const frequency: Frequency = { countOnes: 0, countZeroes: 0 };
      for (const line of allLinesCO2) {
        switch (line[j]) {
          case "0":
            frequency.countZeroes++;
            break;
          case "1":
            frequency.countOnes++;
            break;
        }
      }
      const mostFrequent =
        frequency.countOnes >= frequency.countZeroes ? "1" : "0";
      allLinesCO2 = allLinesCO2.filter((line) => line[j] !== mostFrequent);
      j++;
      if (allLinesCO2.length === 1) {
        break;
      }
    }
    return (
      parseInt(allLinesCO2[0].join(""), 2) *
      parseInt(allLinesOxygen[0].join(""), 2)
    );
  }
  return 0;
};

export default day;
