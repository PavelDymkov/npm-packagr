import { absolutePath, path } from "node-path-tags";

import { tools } from "../__internal__/tools";
import { NpmPackagrParams } from "../npm-packagr";

export * from "./assets";
export * from "./badge";
export * from "./do-if";
export * from "./file";
export * from "./git";
export * from "./npx";
export * from "./package-json";
export * from "./publish";
export * from "./test";
export * from "./version";

export interface Pipe {
    (context: PipeContext): void;
}

type Tools = typeof tools;

type FromNpmPackagrParams<Keys extends keyof NpmPackagrParams> = {
    readonly [Key in Keys]-?: Exclude<NpmPackagrParams[Key], undefined>;
};

export interface PipeContext
    extends Tools,
        FromNpmPackagrParams<"packageDirectory" | "sourceDirectory"> {
    readonly absolutePath: typeof absolutePath;
    readonly path: typeof path;
    readonly target: string;
}
