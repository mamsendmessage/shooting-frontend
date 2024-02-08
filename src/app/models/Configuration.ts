import { SkeetConfig } from "./SkeetConfig";

export class Configuration {
    public ID: number;
    public Type: number;
    public TimePerShot: number = 10;
    public TimeToRefill: number = 10;
    public NumberOfSkeet: number = 25;
    public Skeets: SkeetConfig[] = [];
    public config: string;
    constructor(pConfig: Configuration = null) {
        this.Skeets = [];
        if (pConfig) {
            this.ID = pConfig.ID;
            this.Type = pConfig.Type;
            this.TimePerShot = pConfig.TimePerShot;
            this.TimeToRefill = pConfig.TimeToRefill;
            this.NumberOfSkeet = pConfig.NumberOfSkeet;
            this.Skeets = pConfig.Skeets && this.Skeets.length > 0 ? this.Skeets : [];
            this.config = pConfig.config;
        }
    }
}