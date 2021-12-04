import { writeFileSync as write } from "fs";

import { Pipeline } from ".";

export interface FileConfig {
    name: string;
    content: string;
    raw?: boolean;
}

const startSpace = /^\s+/;

export function file(config: () => FileConfig): Pipeline {
    return () => {
        const { name, content, raw } = config();

        if (raw) write(name, content);

        const lines = content
            .trim()
            .split("\n")
            .map((source) => source.replace(startSpace, ""));

        lines.push("");

        write(name, lines.join("\n"));
    };
}
