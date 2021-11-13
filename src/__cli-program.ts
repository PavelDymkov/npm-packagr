import { program } from "commander";

import { NPM_PACKAGR_DEV } from "./__internal__/constants";
import { run } from "./__tools__/run";

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

let command = `npx ts-node ${script}`;

if (dev) command = `cross-env ${NPM_PACKAGR_DEV}=1 ` + command;

run(command);
