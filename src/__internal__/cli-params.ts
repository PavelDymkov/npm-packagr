export class CLIParams {
    private items: string[] = [];

    constructor(params: Record<string, string | boolean> = {}) {
        Object.entries(params).forEach(([name, value]) =>
            this.append(name, value),
        );
    }

    append(name: string, value: string | boolean): void {
        if (typeof value === "string") {
            this.items.push(kebabify(name));
            this.items.push(JSON.stringify(value));
        }

        if (typeof value === "boolean") {
            if (value) this.items.push(kebabify(name));
        }
    }

    toString(): string {
        return " " + this.items.join(" ");
    }
}

function kebabify(source: string): string {
    return "--" + source.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}
