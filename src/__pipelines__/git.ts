import { not } from "logical-not";
import { exec, exit } from "shelljs";

import { run } from "../__tools__/run";
import { Pipeline } from ".";

export function git(action: "push" | "check-status"): Pipeline {
    return () => {
        switch (action) {
            case "push":
                run("git push");
                break;
            case "check-status":
                if (not(isNoChanges())) {
                    console.log(`Git working directory not clean`);

                    exit(1);
                }
                break;
        }
    };
}

function isNoChanges(): boolean {
    const changes = exec("git status --porcelain", { silent: true });

    return not(changes);
}
