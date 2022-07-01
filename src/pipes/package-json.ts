import { writeFileSync as write } from "fs";
import { PackageJson } from "type-fest";

import { Pipe, PipeContext } from ".";

export interface PackageJsonHandler {
    (packageJson: PackageJson, context: PipeContext): void;
}

export function packageJSON(handler: PackageJsonHandler = () => {}): Pipe {
    return (context) => {
        const {
            absolutePath: absolute,
            packageDirectory,
            path: relative,
        } = context;

        const packageJSON: PackageJson = require(absolute`package.json`);

        handler(packageJSON, context);

        const path = relative`${packageDirectory}/package.json`;
        const file = JSON.stringify(packageJSON, null, "    ");

        write(path, file);
    };
}
