import { readLines, getReaderForDay, Day } from "../utils/index.ts";
type LaternfishConstructorArg = number | undefined;
class Laternfish {
  daysLeftToDublicate: number;

  constructor(daysLeftToDublicate?: LaternfishConstructorArg) {
    if (daysLeftToDublicate === undefined) {
      this.daysLeftToDublicate = 8;
    } else {
      this.daysLeftToDublicate = daysLeftToDublicate;
    }
  }
  /**
   * @returns true if new firsh needs to be created
   */
  advanceDay(): boolean {
    if (this.daysLeftToDublicate === 0) {
      this.reset();
      return true;
    }
    this.daysLeftToDublicate -= 1;
    return false;
  }

  private reset(): void {
    this.daysLeftToDublicate = 6;
  }
}

const getLanternFishFromLine = async (
  rl: AsyncIterableIterator<string>
): Promise<Set<Laternfish>> => {
  const lanternFishes = new Set<Laternfish>();
  const line: string = await (await rl.next()).value;
  const startingDays: number[] = line.split(",").map(Number);
  startingDays.forEach((day) => lanternFishes.add(new Laternfish(day)));

  return lanternFishes;
};

const day = async (day: Day): Promise<number> => {
  const fileReader = await getReaderForDay(day);
  const rl = readLines(fileReader);
  const lanternFishes = await getLanternFishFromLine(rl);
  const fishToAdd = new Set<Laternfish>();
  for (let i = 1; i <= 80; i++) {
    for (const fish of lanternFishes) {
      const addNewFish: boolean = fish.advanceDay();
      if (addNewFish) {
        fishToAdd.add(new Laternfish());
      }
    }
    for (const fish of fishToAdd) {
      lanternFishes.add(fish);
    }
    fishToAdd.clear();
  }
  return lanternFishes.size;
};

export default day;
