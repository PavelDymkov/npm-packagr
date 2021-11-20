# npm packagr

![build: passing](https://raw.githubusercontent.com/PavelDymkov/npm-packagr/master/badges/build.svg)
![d.ts: ✔](https://raw.githubusercontent.com/PavelDymkov/npm-packagr/master/badges/dts.svg)
![license: ISC](https://raw.githubusercontent.com/PavelDymkov/npm-packagr/master/badges/license.svg)

The utility to build and publish an npm package.

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
import { assets, doIf, packageJSON } from "npm-packagr/pipelines";

npmPackagr({
    pipelines: [
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

## Pipelines

<table>
    <tr>
        <th>
        assets
        </th>
        <td>
        Copy files to root of package directory.
        Also can copy file to some target path in package directory.
        </td>
    </tr>
    <tr>
        <th>
        badge
        </th>
        <td>
        Create badges and add links to README.md
        </td>
    </tr>
    <tr>
        <th>
        doIf
        </th>
        <td>
        Run any pipelines by the target.
        </td>
    </tr>
    <tr>
        <th>
        git
        </th>
        <td>
        Git commit or Git push
        </td>
    </tr>
    <tr>
        <th>
        packageJSON
        </th>
        <td>
        Manipulations with a package.json
        </td>
    </tr>
    <tr>
        <th>
        publish
        </th>
        <td>
        Publish a package
        </td>
    </tr>
    <tr>
        <th>
        test
        </th>
        <td>
        Run a test
        </td>
    </tr>
    <tr>
        <th>
        version
        </th>
        <td>
        Bump a package version
        </td>
    </tr>
</table>
