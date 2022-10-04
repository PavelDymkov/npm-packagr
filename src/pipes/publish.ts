import { execSync as exec } from "child_process";
import { not } from "logical-not";
import { join, resolve } from "path";
import { exit } from "shelljs";

import { run } from "../__internal__/run";
import { sh } from "../__internal__/sh";
import { Pipe } from ".";

export interface PipePublishLoginOptions {
    account: string;
    email: string;
}

export interface PipePublishOptions {
    login: PipePublishLoginOptions;
    registry: string;
}

export function publish(
    options: Partial<PipePublishOptions> | PipePublishLoginOptions = {},
): Pipe {
    const parsedOptions = parseOptions(options);

    return ({ packageDirectory }) => {
        const registry =
            parsedOptions.registry || sh(`npm config get registry`);

        if (parsedOptions.login) {
            const { account, email } = parsedOptions.login;

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

function parseOptions(
    source: Partial<PipePublishOptions> | PipePublishLoginOptions,
): Partial<PipePublishOptions> {
    if (isPipePublishLoginOptions(source)) return { login: source };

    return source;
}

function isPipePublishLoginOptions(
    source: any,
): source is PipePublishLoginOptions {
    if (not(source)) return false;

    const { account, email } = source as PipePublishLoginOptions;

    if (typeof account !== "string") return false;
    if (typeof email !== "string") return false;

    return true;
}
