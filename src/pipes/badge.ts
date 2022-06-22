import { not } from "logical-not";
import { clean, create, CreateOptions } from "package-badges";
import { resolve } from "path";
import { PackageJson } from "type-fest";

import { Pipe } from ".";

export enum BadgeType {
    Build = "build",
    License = "license",
    NpmVersion = "npm-version",
    Test = "test",
    TSDeclarations = "dts",
}

interface Badge {
    (type: BadgeType): Pipe;
    (fileName: string, options: CreateOptions): Pipe;
}

let cleaned = false;

export const badge: Badge = (
    name: string | BadgeType,
    options?: CreateOptions,
): Pipe => {
    return () => {
        if (not(cleaned)) {
            clean();

            cleaned = true;
        }

        if (not(options))
            switch (name) {
                case BadgeType.Build:
                    create("build", {
                        label: "build",
                        message: "success",
                        messageColor: "success",
                    });
                    break;
                case BadgeType.License:
                    create("license", {
                        label: "license",
                        message: getLicense(),
                        messageColor: "green",
                    });
                    break;
                case BadgeType.NpmVersion:
                    create("npm", {
                        label: "npm",
                        message: getNpmVersion(),
                        messageColor: "informational",
                    });
                    break;
                case BadgeType.Test:
                    create("test", {
                        label: "test",
                        message: "passed",
                        messageColor: "success",
                    });
                    break;
                case BadgeType.TSDeclarations:
                    create("dts", {
                        label: "d.ts",
                        labelColor: "#3178c6",
                        message: "✔",
                    });
                    break;
            }
        else create(name, options);
    };
};

function getLicense(): string {
    const packageJSON = require(resolve("package.json")) as PackageJson;

    return packageJSON.license || "";
}

function getNpmVersion(): string {
    const packageJSON = require(resolve("package.json")) as PackageJson;

    return packageJSON.version || "";
}
