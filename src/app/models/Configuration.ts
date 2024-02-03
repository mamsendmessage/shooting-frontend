import { SkeetConfig } from "./SkeetConfig";

export class Configuration {
    public ID: number;
    public Type: number;
    public TimePerShot: number;
    public TimeToRefill: number;
    public NumberOfSkeet: number;
    public Skeets: SkeetConfig[];
    constructor(pConfig: Configuration = null) {
        this.Skeets = [];
        if (pConfig) {
            this.ID = pConfig.ID;
            this.Type = pConfig.Type;
            this.TimePerShot = pConfig.TimePerShot;
            this.TimeToRefill = pConfig.TimeToRefill;
            this.NumberOfSkeet = pConfig.NumberOfSkeet;
            this.Skeets = pConfig.Skeets && this.Skeets.length > 0 ? this.Skeets : [];
        }
    }
}