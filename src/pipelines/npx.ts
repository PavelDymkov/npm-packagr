import { not } from "logical-not";
import { exit } from "shelljs";

import { run } from "../__internal__/run";
import { Pipeline } from ".";

export function npx(command: string): Pipeline {
    return () => {
        const ok = run(`npx ${command}`);

        if (not(ok)) exit(1);
    };
}
