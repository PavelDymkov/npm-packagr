import { not } from "logical-not";
import { exit } from "shelljs";

import { run } from "../__internal__/run";
import { Pipe, PipeContext } from ".";

export interface PipeNpxCallback {
    (context: PipeContext): string;
}

export function npx(command: string): Pipe;
export function npx(callback: PipeNpxCallback): Pipe;
export function npx(parameter: string | PipeNpxCallback): Pipe {
    return (context) => {
        const command =
            typeof parameter === "function" ? parameter(context) : parameter;

        const ok = run(`npx ${command}`);

        if (not(ok)) exit(1);
    };
}
