export class Ticket {
    public ID: number;
    public UserId: number;
    public LaneId: number;
    public PlayerLevelId?: number;
    public SessionTimeId: number;
    public GameTypeId: number;
    public State: number;
    public CreationDate: Date;
    public LastModificationDate: Date;
    public GamePeriod: number;
    constructor(pTicket: Ticket) {
        if (pTicket) {
            this.ID = pTicket.ID;
            this.UserId = pTicket.UserId;
            this.LaneId = pTicket.LaneId;
            this.PlayerLevelId = pTicket.PlayerLevelId;
            this.SessionTimeId = pTicket.SessionTimeId;
            this.GameTypeId = pTicket.GameTypeId;
            this.State = pTicket.State;
            this.CreationDate = pTicket.CreationDate;
            this.LastModificationDate = pTicket.LastModificationDate;
            this.GamePeriod = pTicket.GamePeriod;
        }
    }
}