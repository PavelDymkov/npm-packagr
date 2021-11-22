import { exec } from "shelljs";

export function sh(command: string): string {
    return exec(command, { silent: true }).stdout.trim();
}
