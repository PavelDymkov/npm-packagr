import { Pipeline, PipelineContext } from ".";

export interface BuildHandler {
    (context: PipelineContext): void;
}

export function build(handler: BuildHandler): Pipeline {
    return (context) => {
        handler(context);
    };
}
