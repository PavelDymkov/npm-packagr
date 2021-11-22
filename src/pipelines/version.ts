import { not } from "logical-not";
import { exit } from "shelljs";

import { run } from "../__internal__/run";
import { Pipeline } from ".";

export function version(
    action:
        | "major"
        | "minor"
        | "patch"
        | "premajor"
        | "preminor"
        | "prepatch"
        | "prerelease",
): Pipeline {
    return () => {
        const ok = run(`npm version ${action}`, { silent: true });

        if (not(ok)) {
            console.log(`Error by "npm version ${action}"`);

            exit(1);
        }
    };
}
