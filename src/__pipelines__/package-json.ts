import { writeFileSync as write } from "fs";
import { resolve } from "path";
import { PackageJson } from "type-fest";

import { Context } from "..";
import { Pipeline } from ".";

export interface PackageJsonHandler {
    (packageJson: PackageJson, context: Context): void;
}

export function packageJSON(handler: PackageJsonHandler): Pipeline {
    return ({ packageDirectory, context }) => {
        const packageJSON = require(resolve("package.json")) as PackageJson;

        handler(packageJSON, context);

        const path = resolve(packageDirectory, "package.json");
        const file = JSON.stringify(packageJSON, null, "    ");

        write(path, file);
    };
}
