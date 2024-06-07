import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export function getArgs() {
  const args = yargs(hideBin(process.argv))
    .array("")
    .default("", [])
    .parseSync();

  return {
    subnets: args["_"] as string[],
  };
}
