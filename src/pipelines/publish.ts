import { execSync as run } from "child_process";
import { join, resolve } from "path";
import { exec, exit } from "shelljs";

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

            const { code } = exec(
                `node ${executable} --account ${account} --email ${email}`,
            );

            if (code) exit(1);
        }

        run("npm publish", {
            cwd: resolve(packageDirectory),
            stdio: "inherit",
        });
    };
}
