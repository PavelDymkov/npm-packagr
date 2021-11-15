import { Pipeline, PipelineContext } from ".";

export function doIf(
    state: "publish" | "dev",
    pipelines: Pipeline[],
): Pipeline {
    return (context) => {
        pipelines.forEach((pipeline) => {
            if (check(state, context)) pipeline(context);
        });
    };
}

function check(
    state: "publish" | "dev",
    { publish }: PipelineContext,
): boolean {
    if (publish) return state === "publish";
    else return state === "dev";
}
