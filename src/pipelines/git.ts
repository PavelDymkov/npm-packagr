import { exec, exit } from "shelljs";

import { Pipeline } from ".";

interface Git {
    (action: "push" | "check-status"): Pipeline;
    (action: "commit", message: string): Pipeline;
    (action: "branch", brunchName: string): Pipeline;
}

export const git: Git = (action, payload?: string): Pipeline => {
    return () => {
        switch (action) {
            case "push":
                exec("git push", { silent: true });
                break;
            case "check-status":
                if (hasChanges()) {
                    console.log(`Git working directory not clean`);

                    exit(1);
                }
                break;
            case "commit":
                if (hasChanges()) {
                    exec("git add .", { silent: true });
                    exec(`git commit -m "${payload}"`, {
                        silent: true,
                    });
                }
                break;
            case "branch":
                if (getBranchName() !== payload) {
                    console.log(`Git branch is not a ${getBranchName()}`);

                    exit(1);
                }
                break;
        }
    };
};

function hasChanges(): boolean {
    const changes = exec("git status --porcelain", { silent: true });

    return Boolean(changes.stdout.trim());
}

function getBranchName(): string {
    return exec("git branch").stdout.trim();
}
