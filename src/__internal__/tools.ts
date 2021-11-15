import { cp, exit, ls, mkdir, mv, rm, sed, test } from "shelljs";

import { run as exec } from "./run";

export const tools = {
    cp,
    exec,
    exit,
    ls,
    mkdir,
    mv,
    rm,
    sed,
    test,
} as const;
