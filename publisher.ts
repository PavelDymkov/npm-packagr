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
            git("commit", "npm-packagr"),

            npx("tsc"),

            version("patch", {
                commitHooks: false,
                gitTagVersion: false,
            }),
            version("patch", {
                commitHooks: false,
                gitTagVersion: false,
            }),
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

            assets("LICENSE", "README.md"),
            assets({
                from: "src/ts-node.config.json",
                to: "__internal__/ts-node.config.json",
            }),

            publish({
                login: { account: "paveldymkov", email: "dymkov86@gmail.com" },
            }),

            ({ exec }) => {
                exec(`npm i -D npm-packagr`);
            },

            git("commit", "npm-packagr"),
            git("push"),
        ]),

        doIf("dev", [npx("tsc --watch")]),
    ],
});
