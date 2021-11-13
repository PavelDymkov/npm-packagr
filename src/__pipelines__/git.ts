import { not } from "logical-not";
import { exec, exit } from "shelljs";

import { run } from "../__tools__/run";
import { Pipeline } from ".";

export function git(
    action: "push" | "check-status" | "commit",
    value?: string,
): Pipeline {
    return () => {
        switch (action) {
            case "push":
                exec("git push", { silent: true });
                break;
            case "check-status":
                if (not(isNoChanges())) {
                    console.log(`Git working directory not clean`);

                    exit(1);
                }
                break;
            case "commit":
                if (not(isNoChanges())) {
                    exec("git add .", { silent: true });
                    exec(`git commit -m "${value || "update"}"`, {
                        silent: true,
                    });
                }
                break;
        }
    };
}

function isNoChanges(): boolean {
    const changes = exec("git status --porcelain", { silent: true });

    return not(changes.stdout.trim());
}
