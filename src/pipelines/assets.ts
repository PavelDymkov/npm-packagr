import { resolve } from "path/posix";
import { cp } from "shelljs";

import { Pipeline } from ".";

interface Assets {
    (...files: string[]): Pipeline;
    (config: { from: string; to: string }): Pipeline;
}

export const assets: Assets = (...files): Pipeline => {
    if (files.length === 0) return () => {};

    if (typeof files[0] === "string")
        return ({ packageDirectory }) => {
            cp("-R", files as string[], packageDirectory);
        };

    const [config] = files;

    return ({ packageDirectory }) => {
        cp("-R", config.from, resolve(packageDirectory, config.to));
    };
};
