import { Configuration } from "./Configuration";
import { SkeetConfig } from "./SkeetConfig";

export class CompetitionConfiguration {
    public ID: number;
    public Type: number;
    public TimePerShot: number = 10;
    public Configurations: Configuration[] = [];
    public config: string;
    constructor(pConfig: CompetitionConfiguration = null) {
        this.Configurations = [];
        if (pConfig) {
            this.ID = pConfig.ID;
            this.Type = pConfig.Type;
            this.TimePerShot = pConfig.TimePerShot;
            this.Configurations = pConfig.Configurations && this.Configurations.length > 0 ? this.Configurations : [];
            this.config = pConfig.config;
        }
    }
}