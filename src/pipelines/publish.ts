import { execSync as run } from "child_process";
import { resolve } from "path";

import { Pipeline } from ".";

export function publish(): Pipeline {
    return ({ packageDirectory }) => {
        run("npm publish", {
            cwd: resolve(packageDirectory),
            stdio: "inherit",
        });
    };
}
