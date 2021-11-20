import { not } from "logical-not";
import { resolve } from "path";
import { exit, mkdir, pwd, rm, test } from "shelljs";

import { NPM_PACKAGR_TARGET } from "./__internal__/constants";
import { tools } from "./__internal__/tools";
import { Pipeline, PipelineContext } from "./pipelines/";

export interface NpmPackagrParams {
    packageDirectory?: string;
    pipelines: Pipeline[];
}

export function npmPackagr(params: NpmPackagrParams): void {
    if (not(test("-f", "package.json"))) {
        const currentDirectory = pwd().stdout.trim();

        console.log(
            `find no "package.json" in current directory (${currentDirectory})`,
        );

        exit(1);
    }

    const { packageDirectory = "package", pipelines } = params;

    if (test("-d", packageDirectory)) rm("-rf", packageDirectory);

    mkdir(packageDirectory);

    const context: PipelineContext = Object.seal({
        ...tools,

        packageDirectory,
        target: String(process.env[NPM_PACKAGR_TARGET]),
    });

    pipelines.forEach((pipeline) => pipeline(context));
}
