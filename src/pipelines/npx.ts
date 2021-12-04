import { Pipeline } from "npm-packagr/pipelines";

export function npx(command: string): Pipeline {
    return ({ exec }) => exec(`npx ${command}`);
}
