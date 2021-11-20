import { execSync as run } from "child_process";
import { resolve } from "path";

import { Pipeline } from ".";

export function publish(account?: { name: string; email: string }): Pipeline {
    return ({ packageDirectory }) => {
        if (account) {
        }

        run("npm publish", {
            cwd: resolve(packageDirectory),
            stdio: "inherit",
        });
    };
}
