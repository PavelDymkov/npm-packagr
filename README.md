# npm packagr

![build: success](https://raw.githubusercontent.com/PavelDymkov/npm-packagr/main/badges/build.svg)
![d.ts: ✔](https://raw.githubusercontent.com/PavelDymkov/npm-packagr/main/badges/dts.svg)
![license: MIT](https://raw.githubusercontent.com/PavelDymkov/npm-packagr/main/badges/license.svg)

The utility to build and publish a npm package.

## Why?

If your package sources transpile before publishing.
This utility helps you to build your package step by step and publish it.

## Example

For example, the package has structure:

```
.
├── src
│   └── index.ts
├── LICENSE
├── npm-packagr.ts
├── package.json
├── README.md
└── tsconfig.json
```

File `npm-packagr.ts` contains:

```ts
import { npmPackagr } from "npm-packagr";
import { assets, doIf, packageJSON } from "npm-packagr/pipes";

npmPackagr({
    packageDirectory: "some/path", // "package" by default
    pipeline: [
        // some manipulations with package.json
        packageJSON((packageJson) => {
            delete packageJson.scripts;
            delete packageJson.devDependencies;

            packageJson.types = "types/";
        }),

        doIf("build", [
            ({ exec }) => {
                exec("tsc");
            },

            // needs to copy files to package
            assets("LICENSE", "README.md"),
        ]),

        doIf("dev", [
            ({ exec }) => {
                exec("tsc --watch");
            },
        ]),
    ],
});
```

Now, execute in the shell:

```sh
npx packagr --target build
```

It creates `package` directory that will seem like this:

```
.
├── package
│   ├── LICENSE
│   ├── index.d.ts
│   ├── index.js
│   ├── package.json
│   └── README.md
├── src
│   └── index.ts
├── LICENSE
├── npm-packagr.ts
├── package.json
├── README.md
└── tsconfig.json
```

Also you can see [publisher.ts](https://github.com/PavelDymkov/npm-packagr/blob/main/publisher.ts) file of `npm-packagr`.
It has been published by `npm-packagr`!)

## Pipes

### assets

Copy files to root of package directory.

```ts
assets("a", "b/c"); // same as cp -R a b/c package
```

Also can copy file to some target path in package directory.

```ts
assets({ from: "a", to: "b" }); // same as cp -R x package/b
```

### badge

Create badges and add links to README.md. Using a
[package-badges](https://www.npmjs.com/package/package-badges)

### doIf

Run pipeline by the target option.

```ts
doIf("target-name", [
    () => {
        console.log("show if run:");
        console.log("npx packagr --target target-name");
    },
]);
```

### file

Write a file.

```ts
file(() => ({
    name: "cli.js",
    content: `
        #!/usr/bin/env node

        require("..");
    `,
}));
```

### git

Git actions and conditions.

```ts
git("branch", "brunchName"); // stop if the current brunch is not a "brunchName"
git("check-status"); // stop if "git status" returns some changes
git("commit", "message"); // git commit -m "message"
git("push"); // git push
```

### npx

Run `npx`.

```ts
npx("tsc")
// equals
({ exec }) => exec("npx tsc")
```

### packageJSON

Manipulations with a package.json.

### publish

Publish a package.

```ts
publish(); // npm publish

// or you can provide the npm account
publish({ account: "name", email: "e@mail" });
```

### test

Run a test.

### version

Bump a package version.

## Custom pipeline

Pipeline is just a function.
The fisrt argument is the context that is an object contains some functions from
[shelljs](https://www.npmjs.com/package/shelljs)
and

-   [exec](#exec)
-   **packageDirectory** path to package directory.
-   [sh](#sh)
-   **target** target option.

```ts
import { Pipeline } from "./package/pipelines";

const myPipeline: Pipeline = ({
    cp, // shelljs
    exec,
    exit, // shelljs
    ls, // shelljs
    mkdir, // shelljs
    mv, // shelljs
    packageDirectory,
    rm, // shelljs
    sed, // shelljs
    sh,
    target,
    test, // shelljs
    touch, // shelljs
}) => {
    /* ... */
};
```

### exec

Executes a command with output to console (or silent) and returns `true` if success.

```ts
const success: boolean = exec("tsc");
// or
const success: boolean = exec("tsc", { silent: true });
```

### sh

Executes a command with no output to console and returns string of the output.

```ts
const version: string = sh("node --version");
```
