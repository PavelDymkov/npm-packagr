import { npmPackagr } from "npm-packagr";
import {
    assets,
    badge,
    BadgeType,
    build,
    doIf,
    git,
    packageJSON,
    version,
} from "npm-packagr/pipelines";

npmPackagr({
    pipelines: [
        doIf("publish", [
            git("check-status"),

            build(({ exec }) => exec("tsc")),

            version("patch"),
        ]),

        packageJSON((packageJson) => {
            delete packageJson.scripts;
            delete packageJson.devDependencies;

            packageJson.main = "index.js";
            packageJson.types = ".";
            packageJson.bin = {
                packagr: "./bin.js",
            };
        }),

        doIf("publish", [
            badge(BadgeType.Build),
            badge(BadgeType.TSDeclarations),
            badge(BadgeType.License),

            git("commit", "npm-packagr"),
            git("push"),
        ]),

        assets("LICENSE", "README.md", "src/bin.js", "src/ts-node.config.json"),

        doIf("dev", [
            build(({ exec }) => {
                exec("tsc --watch");
            }),
        ]),
    ],
});
