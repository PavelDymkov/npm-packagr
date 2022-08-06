import { not } from "logical-not";
import { exit } from "shelljs";

import { run } from "../__internal__/run";
import { Pipe } from ".";

export function tsc(): Pipe {
    return ({ packageDirectory }) => {
        const ok = run(`npx tsc --outDir ${packageDirectory}`);

        if (not(ok)) exit(1);
    };
}
