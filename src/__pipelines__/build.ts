import { Context } from "..";
import { Pipeline } from ".";

export interface BuildHandler {
    (context: Context): void;
}

export function build(handler: BuildHandler): Pipeline {
    return ({ context }) => {
        handler(context);
    };
}
