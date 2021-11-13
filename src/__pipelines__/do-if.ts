import { Pipeline, PipelineContext } from ".";

interface DoIf {
    (condition: "publish" | "dev", pipeline: Pipeline): Pipeline;
    (condition: "publish" | "dev", pipelines: Pipeline[]): Pipeline;
    (options: { env: "publish" | "dev"; pipeline: Pipeline }): Pipeline;
    (options: { env: "publish" | "dev"; pipelines: Pipeline[] }): Pipeline;
}

export const doIf: DoIf = (...args: any[]): Pipeline => {
    const pipelines: Pipeline[] = [];

    let condition: "publish" | "dev" = "dev";

    if (args.length === 1) {
        const options = args[0] as {
            env: "publish" | "dev";
            pipeline?: Pipeline;
            pipelines?: Pipeline[];
        };

        condition = options.env;

        if (options.pipeline) pipelines.push(options.pipeline);
        if (options.pipelines) pipelines.push(...options.pipelines);
    }

    if (args.length === 2) {
        condition = args[0];

        if (Array.isArray(args[1])) pipelines.push(...args[1]);
        else pipelines.push(args[1]);
    }

    return (context) => {
        pipelines.forEach((pipeline) => {
            if (check(condition, context)) pipeline(context);
        });
    };
};

function check(
    condition: "publish" | "dev",
    { context }: PipelineContext,
): boolean {
    if (context.publish) return condition === "publish";
    else return condition === "dev";
}
