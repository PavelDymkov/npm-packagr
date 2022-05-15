import { not } from "logical-not";
import { exit } from "shelljs";

import { run } from "../__internal__/run";
import { Pipeline } from ".";

export function test(): Pipeline {
    return () => {
        const ok = run("npm test");

        if (not(ok)) exit(1);
    };
}
