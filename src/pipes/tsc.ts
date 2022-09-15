import { not } from "logical-not";
import { exit } from "shelljs";

import { run } from "../__internal__/run";
import { Pipe, PipeContext } from ".";

export interface TsCompilerOptions {
    project: string;
    watch: boolean;

    allowJs: boolean;
    checkJs: boolean;
    declaration: boolean;
    declarationMap: boolean;
    emitDeclarationOnly: boolean;
    esModuleInterop: boolean;
    files: string[];
    jsx: "preserve" | "react" | "react-native" | "react-jsx" | "react-jsxdev";
    lib: (
        | "es5"
        | "es6"
        | "es2015"
        | "es7"
        | "es2016"
        | "es2017"
        | "es2018"
        | "es2019"
        | "es2020"
        | "es2021"
        | "es2022"
        | "esnext"
        | "dom"
        | "dom.iterable"
        | "webworker"
        | "webworker.importscripts"
        | "webworker.iterable"
        | "scripthost"
        | "es2015"
        | ".core"
        | "es2015.collection"
        | "es2015.generator"
        | "es2015.iterable"
        | "es2015.promise"
        | "es2015.proxy"
        | "es2015.reflect"
        | "es2015.symbol"
        | "es2015.symbol.wellknown"
        | "es2016.array.include"
        | "es2017.ob"
        | "ject"
        | "es2017.sharedmemory"
        | "es2017.string"
        | "es2017.intl"
        | "es2017.typedarrays"
        | "es2018.asyncgenerator"
        | "es2018.asynciterable"
        | "esnext.asynciterable"
        | "es2018.intl"
        | "es2018.promise"
        | "es2018.r"
        | "egexp"
        | "es2019.array"
        | "es2019.object"
        | "es2019.string"
        | "es2019.symbol"
        | "esnext.symbol"
        | "es2020.bigint"
        | "esnext.bigint"
        | "es2020.date"
        | "es2020.promise"
        | "es2020.sharedmemory"
        | "es2020.string"
        | "es20"
        | "20.symbol.wellknown"
        | "es2020.intl"
        | "es2020.number"
        | "es2021.promise"
        | "esnext.promise"
        | "es2021.string"
        | "es2021.weakref"
        | "esnext.weakref"
        | "es2021.intl"
        | "es2022.array"
        | "esnext.array"
        | "es2022.error"
        | "es2022.intl"
        | "es2022.object"
        | "es2022.string"
        | "esnext.string"
        | "esnext.intl"
    )[];
    module:
        | "none"
        | "commonjs"
        | "amd"
        | "umd"
        | "system"
        | "es6"
        | "es2015"
        | "es2020"
        | "es2022"
        | "esnext"
        | "node16"
        | "nodenext";
    noEmit: boolean;
    outDir: string;
    outFile: string;
    removeComments: boolean;
    sourceMap: boolean;
    strict: boolean;
    target:
        | "es3"
        | "es5"
        | "es6"
        | "es2015"
        | "es2016"
        | "es2017"
        | "es2018"
        | "es2019"
        | "es2020"
        | "es2021"
        | "es2022"
        | "esnext";
    types: string[];
}

export interface PipeTscCallback {
    (context: PipeContext): Partial<TsCompilerOptions>;
}

export function tsc(options?: Partial<TsCompilerOptions>): Pipe;
export function tsc(handler: PipeTscCallback): Pipe;

export function tsc(
    parameter?: Partial<TsCompilerOptions> | PipeTscCallback,
): Pipe {
    if (not(parameter)) parameter = () => ({});

    const callback: PipeTscCallback =
        typeof parameter === "function"
            ? parameter
            : () => parameter as Partial<TsCompilerOptions>;

    return (context) => {
        const options = callback(context);

        if (not(options.outDir)) options.outDir = context.packageDirectory;

        const files = options.files?.join(" ") || "";

        delete options.files;

        const ok = run(`npx tsc ${getOptionsString(options)} ${files}`);

        if (not(ok)) exit(1);
    };
}

function getOptionsString(options: Partial<TsCompilerOptions>): string {
    const parts: string[] = [];

    Object.entries(options || {}).forEach(
        ([key, value]: [string, string | string[] | boolean]) => {
            parts.push(`--${key}`);

            if (typeof value === "string") parts.push(value);
            if (typeof value === "boolean") parts.push(String(value));
            if (Array.isArray(value)) parts.push(...value);
        },
    );

    return parts.join(" ");
}
