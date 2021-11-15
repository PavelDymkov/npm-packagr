import { Context } from "..";

export interface Pipeline {
    (context: PipelineContext): void;
}

export interface PipelineContext {
    packageDirectory: string;
    context: Context;
}
