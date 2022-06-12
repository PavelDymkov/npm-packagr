import { Pipe } from ".";

export function doIf(target: string, pipes: Pipe[]): Pipe {
    return (context) => {
        pipes.forEach((pipeline) => {
            if (context.target === target) pipeline(context);
        });
    };
}
