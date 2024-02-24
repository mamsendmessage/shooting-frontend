import { API } from "./API";

export class SkeetConfig {
    public SkeetID: number[];
    public API: string[];

    constructor(SkeetID: number[] = []) {
        this.SkeetID = SkeetID;
        this.API = [];
    }
}