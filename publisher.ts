import { npmPackagr } from "npm-packagr";
import {
    assets,
    badge,
    BadgeType,
    doIf,
    git,
    packageJSON,
    version,
} from "npm-packagr/pipelines";

npmPackagr({
    pipelines: [
        doIf("publish", [
            git("check-status"),

            ({ exec }) => exec("tsc"),

            ({ cp, packagePath }) => {
                cp(
                    "src/ts-node.config.json",
                    packagePath("__internal__/ts-node.config.json"),
                );
            },

            version("patch"),
        ]),

        packageJSON((packageJson) => {
            delete packageJson.scripts;
            delete packageJson.devDependencies;

            packageJson.main = "npm-packagr.js";
            packageJson.types = ".";
            packageJson.bin = {
                packagr: "./__internal__/cli.js",
            };
        }),

        doIf("publish", [
            badge(BadgeType.Build),
            badge(BadgeType.TSDeclarations),
            badge(BadgeType.License),

            git("commit", "npm-packagr"),
            git("push"),
        ]),

        assets("LICENSE", "README.md", "src/bin.js"),

        doIf("dev", [
            ({ exec }) => {
                exec("tsc --watch");
            },
        ]),
    ],
});
