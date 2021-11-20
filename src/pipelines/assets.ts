import { cp } from "shelljs";

import { Pipeline } from ".";

export function assets(...files: string[]): Pipeline {
    return ({ packageDirectory }) => {
        cp("-R", files, packageDirectory);
    };
}
