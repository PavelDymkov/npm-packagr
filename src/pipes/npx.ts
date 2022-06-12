import { not } from "logical-not";
import { exit } from "shelljs";

import { run } from "../__internal__/run";
import { Pipe } from ".";

export function npx(command: string): Pipe {
    return () => {
        const ok = run(`npx ${command}`);

        if (not(ok)) exit(1);
    };
}
