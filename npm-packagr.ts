import { npmPackagr } from "npm-packagr";
import {
    assets,
    build,
    doIf,
    git,
    packageJSON,
    version,
} from "npm-packagr/pipelines";

npmPackagr({
    pipelines: [
        // doIf("publish", git("check-status")),

        doIf({
            env: "publish",
            pipeline: build(({ exec }) => {
                exec("tsc");
            }),
        }),

        doIf({
            env: "dev",
            pipeline: build(({ exec }) => {
                exec("tsc --watch");
            }),
        }),

        doIf("publish", version("patch")),

        packageJSON((packageJson) => {
            delete packageJson.scripts;
            delete packageJson.devDependencies;

            packageJson.main = "index.js";
            packageJson.bin = {
                packagr: "./cli.js",
            };
            packageJson.types = ".";
        }),

        assets("LICENSE", "README.md", "src/cli.js"),
    ],
});
