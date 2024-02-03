import { API } from "./API";

export class SkeetConfig {
    public SkeetID: number;
    public TimePerShot: number;
    public Name: string;
    public Order: number;
    public API: API[];

    constructor(SkeetID: number, TimePerShot: number, pName: string = '', pOrder: number) {
        this.SkeetID = SkeetID;
        this.TimePerShot = TimePerShot;
        this.Name = pName
        this.Order = pOrder;
        this.API = [];
    }
}