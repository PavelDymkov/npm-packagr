import { Command } from "commander";
import { join } from "path";

import { NPM_PACKAGR_TARGET } from "./constants";
import { run } from "./run";

const program = new Command();

program.version(require("./package.json").version);

program
    .option(
        "-S, --script <path>",
        "path to build ts-script",
        "./npm-packagr.ts",
    )
    .option("-T, --target <name>", "packagr target", "build")
    .parse(process.argv);

const { script, target } = program.opts() as {
    script: string;
    target: string;
};

const tsConfig = join(__dirname, "ts-node.config.json");

run(
    `cross-env ${NPM_PACKAGR_TARGET}="${target}" npx ts-node --project ${tsConfig} ${script}`,
);
