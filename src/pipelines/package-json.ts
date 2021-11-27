import { writeFileSync as write } from "fs";
import { resolve } from "path";
import { PackageJson } from "type-fest";

import { Pipeline, PipelineContext } from ".";

export interface PackageJsonHandler {
    (packageJson: PackageJson, context: PipelineContext): void;
}

export function packageJSON(handler: PackageJsonHandler = () => {}): Pipeline {
    return (context) => {
        const packageJSON = require(resolve("package.json")) as PackageJson;

        handler(packageJSON, context);

        const path = resolve(context.packageDirectory, "package.json");
        const file = JSON.stringify(packageJSON, null, "    ");

        write(path, file);
    };
}
