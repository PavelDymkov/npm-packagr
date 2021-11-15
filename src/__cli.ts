import { Command } from "commander";
import { join } from "path";

import { NPM_PACKAGR_DEV } from "./__internal__/constants";
import { run } from "./__internal__/run";

const program = new Command();

program.version(require("./package.json").version);

program
    .option(
        "-S, --script <path>",
        "path to build ts-script",
        "./npm-packagr.ts",
    )
    .option("-D, --dev", "dev mode")
    .parse(process.argv);

const { script, dev } = program.opts() as {
    script: string;
    dev: boolean;
};

const tsConfig = join(__dirname, "ts-node.config.json");

let command = `npx ts-node --project ${tsConfig} ${script}`;

if (dev) command = `cross-env ${NPM_PACKAGR_DEV}=1 ` + command;

run(command);
