import { not } from "logical-not";
import { exit, mkdir, pwd, rm, test } from "shelljs";

import { NPM_PACKAGR_DEV } from "./__internal__/constants";
import { tools } from "./__tools__/tools";
import { Pipeline, PipelineContext } from "./__pipelines__";

export interface NpmPackagrParams {
    packageDirectory: string;
    pipelines: Pipeline[];
}

export function npmPackagr(params: Partial<NpmPackagrParams>): void {
    if (not(test("-f", "package.json"))) {
        const currentDirectory = pwd().stdout.trim();

        console.log(
            `find no "package.json" in current directory (${currentDirectory})`,
        );

        exit(1);
    }

    const { packageDirectory = "package", pipelines = [] } = params;

    if (test("-d", packageDirectory)) rm("-rf", packageDirectory);

    mkdir(packageDirectory);

    const development = NPM_PACKAGR_DEV in process.env;

    const context: PipelineContext = {
        packageDirectory,
        context: {
            ...tools,
            development,
            publish: !development,
        },
    };

    pipelines.forEach((pipeline) => pipeline(context));
}
