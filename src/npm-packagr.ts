import { not } from "logical-not";
import { absolutePath, path } from "node-path-tags";
import { join } from "path";
import { cp, exit, mkdir, pwd, rm, test } from "shelljs";

import { NPM_PACKAGR_TARGET } from "./__internal__/constants";
import { tools } from "./__internal__/tools";
import { Pipe, PipeContext } from "./pipes";

export interface NpmPackagrParams {
    packagePath?: string;
    sourcePath?: string;

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

    const packagePath = params.packagePath
        ? path`${params.packagePath}`
        : "package";
    const sourcePath = params.sourcePath ? path`${params.sourcePath}` : "src";

    if (test("-d", packagePath)) rm("-rf", packagePath);

    mkdir("-p", packagePath);

    const { pipeline } = params;

    const context: PipeContext = Object.seal({
        ...tools,

        absolutePath,
        packagePath,
        path,
        sourcePath,
        target: String(process.env[NPM_PACKAGR_TARGET]),
    });

    pipeline.forEach((pipeline) => pipeline(context));

    const packageJson = join(packagePath, "package.json");

    if (not(test("-f", packageJson))) cp("package.json", packageJson);
}
