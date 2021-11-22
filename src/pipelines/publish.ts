import { execSync as exec } from "child_process";
import { not } from "logical-not";
import { join, resolve } from "path";
import { exit } from "shelljs";

import { run } from "../__internal__/run";
import { Pipeline } from ".";

export function publish(login?: { account: string; email: string }): Pipeline {
    return ({ packageDirectory }) => {
        if (login) {
            const { account, email } = login;

            const executable = join(
                __dirname,
                "..",
                "__internal__",
                "npm-login.js",
            );

            const ok = run(
                `node ${executable} --account ${account} --email ${email}`,
            );

            if (not(ok)) exit(1);
        }

        exec("npm publish", {
            cwd: resolve(packageDirectory),
            stdio: "inherit",
        });
    };
}
