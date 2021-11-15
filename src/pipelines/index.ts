import { tools } from "../__internal__/tools";

export * from "./assets";
export * from "./badge";
export * from "./build";
export * from "./do-if";
export * from "./git";
export * from "./package-json";
export * from "./publish";
export * from "./test";
export * from "./version";

export interface Pipeline {
    (context: PipelineContext): void;
}

type Tools = typeof tools;

export interface PipelineContext extends Tools {
    packageDirectory: string;
    development: boolean;
    publish: boolean;
}