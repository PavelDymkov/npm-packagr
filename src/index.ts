import { tools } from "./__tools__/tools";

export * from "./npm-packagr";

type Tools = typeof tools;

export interface Context extends Tools {
    development: boolean;
    publish: boolean;
}
