import { spawnSync } from "child_process";
import { not } from "logical-not";

export function run(command: string, options?: { silent?: boolean }): boolean {
    const [name, ...args] = command.trim().split(/\s+/);

    const { status } = spawnSync(name, args, {
        stdio: options?.silent ? "ignore" : "inherit",
    });

    return not(status);
}
