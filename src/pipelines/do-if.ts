import { Pipeline } from ".";

export function doIf(target: string, pipelines: Pipeline[]): Pipeline {
    return (context) => {
        pipelines.forEach((pipeline) => {
            if (context.target === target) pipeline(context);
        });
    };
}
