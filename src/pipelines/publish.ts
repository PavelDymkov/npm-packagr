import { execSync as exec } from "child_process";
import { not } from "logical-not";
import { join, resolve } from "path";
import { exit } from "shelljs";

import { run } from "../__internal__/run";
import { sh } from "../__internal__/sh";
import { Pipeline } from ".";

export interface PipelinePublishOptions {
    login: { account: string; email: string };
    registry: string;
}

export function publish(
    options: Partial<PipelinePublishOptions> = {},
): Pipeline {
    return ({ packageDirectory }) => {
        const registry = options.registry || sh(`npm config get registry`);

        if (options.login) {
            const { account, email } = options.login;

            const executable = join(
                __dirname,
                "..",
                "__internal__",
                "npm-login.js",
            );

            const ok = run(
                `node ${executable} --account ${account} --email ${email} --registry ${registry}`,
            );

            if (not(ok)) exit(1);
        }

        exec(`npm publish --registry ${registry}`, {
            cwd: resolve(packageDirectory),
            stdio: "inherit",
        });
    };
}
