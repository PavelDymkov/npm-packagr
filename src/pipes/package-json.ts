import { readFileSync as read, writeFileSync as write } from "fs";
import { resolve } from "path";
import { PackageJson } from "type-fest";

import { Pipe, PipeContext } from ".";

export interface PackageJsonHandler {
    (packageJson: PackageJson, context: PipeContext): void;
}

export function packageJSON(handler: PackageJsonHandler = () => {}): Pipe {
    return (context) => {
        const packageJSON = JSON.parse(
            read("package.json").toString(),
        ) as PackageJson;

        handler(packageJSON, context);

        const path = resolve(context.packagePath, "package.json");
        const file = JSON.stringify(packageJSON, null, "    ");

        write(path, file);
    };
}
