import { Context } from "..";

export interface Pipeline {
    (context: PipelineContext): void;
}

export interface PipelineContext {
    packageBadges: boolean;
    packageDirectory: string;
    context: Context;
}
