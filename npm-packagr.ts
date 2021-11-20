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
        doIf("build", [
            // git("check-status"),

            ({ exec }) => exec("tsc"),

            version("patch"),
        ]),

        packageJSON((packageJson) => {
            delete packageJson.scripts;
            delete packageJson.devDependencies;

            packageJson.main = "npm-packagr.js";
            packageJson.types = ".";
            packageJson.bin = {
                packagr: "./bin.js",
            };
        }),

        doIf("build", [
            badge(BadgeType.Build),
            badge(BadgeType.TSDeclarations),
            badge(BadgeType.License),

            git("commit", "npm-packagr"),
            git("push"),
        ]),

        assets("LICENSE", "README.md", "src/bin.js", "src/ts-node.config.json"),

        doIf("dev", [
            ({ exec }) => {
                exec("tsc --watch");
            },
        ]),
    ],
});
