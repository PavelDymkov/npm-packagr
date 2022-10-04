import { not } from "logical-not";
import { exit } from "shelljs";

import { CLIParams } from "../__internal__/cli-params";
import { run } from "../__internal__/run";
import { Pipe } from ".";

export interface PipeVersionOptions {
    allowSameVersion: boolean;
    commitHooks: boolean;
    includeWorkspaceRoot: boolean;
    gitTagVersion: boolean;
    json: boolean;
    message: string;
    preid: string;
    signGitTag: boolean;
    workspace: string;
    workspaces: boolean;
    workspacesUpdate: boolean;
}

export function version(
    action:
        | "major"
        | "minor"
        | "patch"
        | "premajor"
        | "preminor"
        | "prepatch"
        | "prerelease",
    options: Partial<PipeVersionOptions> = {},
): Pipe {
    return () => {
        const command = `npm version ${action}${new CLIParams(options)}`;

        const ok = run(command, { silent: true });

        if (not(ok)) {
            console.log(`Error by "${command}"`);

            exit(1);
        }
    };
}
