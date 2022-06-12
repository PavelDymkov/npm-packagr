import { resolve } from "path/posix";
import { cp } from "shelljs";

import { Pipe } from ".";

interface Assets {
    (...files: string[]): Pipe;
    (config: { from: string; to: string }): Pipe;
}

export const assets: Assets = (...files): Pipe => {
    if (files.length === 0) return () => {};

    if (typeof files[0] === "string")
        return ({ packagePath }) => {
            cp("-R", files as string[], packagePath);
        };

    const [config] = files;

    return ({ packagePath }) => {
        cp("-R", config.from, resolve(packagePath, config.to));
    };
};
