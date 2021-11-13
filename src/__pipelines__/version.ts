import { exec } from "shelljs";

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
        exec(`npm version ${action}`, { silent: true });
    };
}
