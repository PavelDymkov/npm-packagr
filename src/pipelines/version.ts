import { not } from "logical-not";
import { exit } from "shelljs";

import { CLIParams } from "../__internal__/cli-params";
import { run } from "../__internal__/run";
import { Pipeline } from ".";

export interface VersionPipelineOptions {
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
    options: Partial<VersionPipelineOptions> = {},
): Pipeline {
    return () => {
        const ok = run(`npm version ${action}${new CLIParams(options)}`, {
            silent: true,
        });

        if (not(ok)) {
            console.log(
                `Error by "npm version ${action}"${new CLIParams(options)}`,
            );

            exit(1);
        }
    };
}
