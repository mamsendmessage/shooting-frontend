import { API } from "./API";

export class SkeetConfig {
    public SkeetID: number;
    public Name: string;
    public Order: number;
    public API: API[];

    constructor(SkeetID: number, pName: string = '', pOrder: number) {
        this.SkeetID = SkeetID;
        this.Name = pName
        this.Order = pOrder;
        this.API = [];
    }
}