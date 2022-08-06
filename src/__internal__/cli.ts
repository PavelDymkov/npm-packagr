#!/usr/bin/env node

import { Command } from "commander";
import { join } from "path";

import {
    NPM_PACKAGR_OUT_DIR,
    NPM_PACKAGR_SRC,
    NPM_PACKAGR_TARGET,
} from "./constants";
import { run } from "./run";

const program = new Command();

program.version(require("../package.json").version);

program
    .option("-T, --target <name>", "packagr target", "build")
    .option("--srcDir <path>", "source directory", ".")
    .option("--outDir <path>", "package directory", "package")
    .option(
        "-S, --script <path>",
        "path to build ts-script",
        "./npm-packagr.ts",
    )
    .parse(process.argv);

const { outDir, script, srcDir, target } = program.opts() as {
    outDir: string;
    script: string;
    srcDir: string;
    target: string;
};

const tsConfig = join(__dirname, "ts-node.config.json");

const ENV = [
    `${NPM_PACKAGR_OUT_DIR}="${outDir}"`,
    `${NPM_PACKAGR_SRC}="${srcDir}"`,
    `${NPM_PACKAGR_TARGET}="${target}"`,
].join(" ");

run(`cross-env ${ENV} npx ts-node --project ${tsConfig} ${script}`);
