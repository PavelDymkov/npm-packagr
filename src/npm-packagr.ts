import { not } from "logical-not";
import { absolutePath, path } from "node-path-tags";
import { cp, exit, mkdir, pwd, rm, test } from "shelljs";

import {
    NPM_PACKAGR_OUT_DIR,
    NPM_PACKAGR_SRC,
    NPM_PACKAGR_TARGET,
} from "./__internal__/constants";
import { tools } from "./__internal__/tools";
import { Pipe, PipeContext } from "./pipes";

export interface NpmPackagrParams {
    packageDirectory?: string;
    sourceDirectory?: string;

    pipeline: Pipe[];
}

export function npmPackagr(params: NpmPackagrParams): void {
    if (not(test("-f", "package.json"))) {
        const currentDirectory = pwd().stdout.trim();

        console.log(
            `find no "package.json" in current directory (${currentDirectory})`,
        );

        exit(1);
    }

    const packageDirectory = params.packageDirectory
        ? path`${params.packageDirectory}`
        : env(NPM_PACKAGR_OUT_DIR, "package");
    const sourceDirectory = params.sourceDirectory
        ? path`${params.sourceDirectory}`
        : env(NPM_PACKAGR_SRC);

    if (test("-d", packageDirectory)) rm("-rf", packageDirectory);

    mkdir("-p", packageDirectory);

    const { pipeline } = params;

    const context: PipeContext = Object.seal({
        ...tools,

        absolutePath,
        packageDirectory,
        path,
        sourceDirectory,
        target: env(NPM_PACKAGR_TARGET),
    });

    pipeline.forEach((pipeline) => pipeline(context));

    const packageJson = path`${packageDirectory}/package.json`;

    if (not(test("-f", packageJson))) cp("package.json", packageJson);
}

function env(name: string, defaultValue = ""): string {
    return process.env[name] || defaultValue;
}
