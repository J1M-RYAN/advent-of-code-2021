import days from "./days/index.ts";

// deno index.ts <DAY> <PART> <isSample>
// deno run --allow-read src/index.ts 1 2 1
// deno intex.ts 1 2 0

const day = Number(Deno.args[0]);
const part = Number(Deno.args[1]);
const isSample = Boolean(Number(Deno.args[2]));

console.log(await days[day - 1]({ day, part, isSample }));
