import { resolve } from "path";
import { cp } from "shelljs";

import { Pipe } from ".";

interface Assets {
    (files: string[]): Pipe;
    (...files: string[]): Pipe;
    (config: { from: string; to: string }): Pipe;
}

export const assets: Assets = (...files): Pipe => {
    if (files.length === 0) return () => {};

    const [item] = files;

    if (Array.isArray(item)) return assets(...item);

    if (typeof item === "string")
        return ({ packageDirectory }) => {
            cp("-R", files as string[], packageDirectory);
        };

    return ({ packageDirectory }) => {
        cp("-R", item.from, resolve(packageDirectory, item.to));
    };
};
