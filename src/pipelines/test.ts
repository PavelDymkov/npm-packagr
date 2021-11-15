import { run } from "../__internal__/run";
import { Pipeline } from ".";

export function test(): Pipeline {
    return () => {
        run("npm run test");
    };
}
