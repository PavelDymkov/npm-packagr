import { writeFileSync as write } from "fs";
import { PackageJson } from "type-fest";

import { Pipe, PipeContext } from ".";

export interface PackageJsonHandler {
    (packageJson: PackageJson, context: PipeContext): void;
}

export function packageJSON(handler: PackageJsonHandler = () => {}): Pipe {
    return (context) => {
        const packageJSON: PackageJson = require("./package.json");

        handler(packageJSON, context);

        const path = context.path`${context.packageDirectory}/package.json`;
        const file = JSON.stringify(packageJSON, null, "    ");

        write(path, file);
    };
}
