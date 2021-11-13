import { spawnSync } from "child_process";

export function run(command: string, options?: { silent?: boolean }): void {
    const [name, ...args] = command.trim().split(/\s+/);

    spawnSync(name, args, { stdio: options?.silent ? "ignore" : "inherit" });
}
