import { writeFileSync as write } from "fs";
import { not } from "logical-not";
import { join } from "path";
import { mkdir, test } from "shelljs";

import { Pipe, PipeContext } from ".";

export interface FileConfig {
    name: string;
    content: string;
    path?: string;
    raw?: boolean;
}

const startSpace = /^\s+/;

export function file(getConfig: (context: PipeContext) => FileConfig): Pipe {
    return (context) => {
        const config = getConfig(context);

        const file = getPath(config);
        const content = getContent(config);

        write(file, content);
    };
}

function getPath({ name, path }: FileConfig): string {
    if (not(path)) return name;

    if (not(test("-d", path))) mkdir("-p", path);

    return join(path, name);
}

function getContent({ content, raw }: FileConfig): string {
    if (raw) return content;

    const lines = content
        .trim()
        .split("\n")
        .map((source) => source.replace(startSpace, ""));

    lines.push("");

    return lines.join("\n");
}
