import { cp, exit, ls, mkdir, mv, rm, sed, test, touch } from "shelljs";

import { run as exec } from "./run";
import { sh } from "./sh";

export const tools = {
    cp,
    exec,
    exit,
    ls,
    mkdir,
    mv,
    rm,
    sed,
    sh,
    test,
    touch,
} as const;
