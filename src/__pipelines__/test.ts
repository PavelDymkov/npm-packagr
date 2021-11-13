import { run } from "../__tools__/run";
import { Pipeline } from ".";

export function test(): Pipeline {
    return () => {
        run("npm run test");
    };
}
