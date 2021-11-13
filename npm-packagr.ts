import { npmPackagr } from "npm-packagr";
import {
    assets,
    badge,
    BadgeType,
    build,
    cleanBadges,
    doIf,
    git,
    packageJSON,
    version,
} from "npm-packagr/pipelines";

npmPackagr({
    pipelines: [
        doIf({
            env: "publish",
            pipelines: [
                git("check-status"),

                build(({ exec }) => exec("tsc")),

                version("patch"),
            ],
        }),

        packageJSON((packageJson) => {
            delete packageJson.scripts;
            delete packageJson.devDependencies;

            packageJson.main = "index.js";
            packageJson.bin = {
                packagr: "./cli.js",
            };
            packageJson.types = ".";
        }),

        doIf({
            env: "publish",
            pipelines: [
                cleanBadges(),

                badge(BadgeType.Build),
                badge(BadgeType.TSDeclarations),
                badge(BadgeType.License),

                git("commit", "npm-packagr"),
                git("push"),
            ],
        }),

        assets("LICENSE", "README.md", "src/cli.js"),

        doIf({
            env: "dev",
            pipeline: build(({ exec }) => {
                exec("tsc --watch");
            }),
        }),
    ],
});
