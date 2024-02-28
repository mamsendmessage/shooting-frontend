import { API } from "./API";

export class SkeetConfig {
    public SkeetID: number[];
    public API: string[];
    public Order: number = -1;
    public LaneId?: number;
    constructor(SkeetID: number[] = [], pLaneId: number = -1) {
        this.SkeetID = SkeetID;
        this.API = [];
        this.Order = -1;
        if (pLaneId > 0) {
            this.LaneId = pLaneId;
        }
    }
}