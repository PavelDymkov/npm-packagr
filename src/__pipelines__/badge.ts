import { not } from "logical-not";
import { clean, create, CreateOptions } from "package-badges";
import { resolve } from "path";
import { PackageJson } from "type-fest";

import { Pipeline } from ".";

export enum BadgeType {
    Build = "build",
    License = "license",
    NpmVersion = "npm-version",
    Test = "test",
    TSDeclarations = "dts",
}

interface Badge {
    (type: BadgeType): Pipeline;
    (fileName: string, options: CreateOptions): Pipeline;
}

let cleaned = false;

export const badge: Badge = (
    name: string | BadgeType,
    options?: CreateOptions,
): Pipeline => {
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
                        message: "passing",
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
                        message: getNpmVersion(),
                        messageColor: "informational",
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
