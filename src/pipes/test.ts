import { not } from "logical-not";
import { exit } from "shelljs";

import { run } from "../__internal__/run";
import { Pipe } from ".";

export function test(): Pipe {
    return () => {
        const ok = run("npm test");

        if (not(ok)) exit(1);
    };
}
