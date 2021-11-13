import { run } from "../__tools__/run";
import { Pipeline } from ".";

export function publish(): Pipeline {
    return ({ packageDirectory }) => {
        run(`cd ${packageDirectory} && npm publish`);
    };
}
