import { npmPackagr } from "npm-packagr";
import {
    assets,
    badge,
    BadgeType,
    doIf,
    git,
    npx,
    packageJSON,
    publish,
    version,
} from "npm-packagr/pipelines";

npmPackagr({
    pipelines: [
        doIf("publish", [
            npx("tsc"),

            git("commit", "npm-packagr"),

            version("patch"),
        ]),

        packageJSON((packageJson) => {
            delete packageJson.scripts;
            delete packageJson.devDependencies;

            packageJson.main = "./npm-packagr.js";
            packageJson.types = "./npm-packagr.d.ts";
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

            assets("LICENSE", "README.md"),
            assets({
                from: "src/ts-node.config.json",
                to: "__internal__/ts-node.config.json",
            }),

            publish({ account: "paveldymkov", email: "dymkov86@gmail.com" }),

            ({ exec }) => {
                exec(`npm i -D npm-packagr`);
            },

            git("commit", "npm-packagr"),
            git("push"),
        ]),

        doIf("dev", [npx("tsc --watch")]),
    ],
});
