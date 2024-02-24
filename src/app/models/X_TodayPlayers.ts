import { TicketState, TicketType, UserType } from "./enums";

export class X_TodayPlayer {
    public UserId: number;
    public Name: string;
    public Photo: string;
    public PlayerLevel: string;
    public GameType: string;
    public State: number;
    public DisplayedState: string;
    public CreationDate: Date;
    public DisplayedDateTime: string;
    public TicketType: number;
    public UserType: number;
    public DisplayedTicketType: string;
    public DisplayedUserType: string;
    public LaneId: number;
    public LaneNumber: number;
    public LaneName: string;
    public TicketId: number;
    constructor(pTodayPlayer: X_TodayPlayer) {
        if (pTodayPlayer) {
            this.UserId = pTodayPlayer.UserId;
            this.TicketId = pTodayPlayer.TicketId;
            this.Photo = pTodayPlayer.Photo;
            this.Name = pTodayPlayer.Name;
            this.GameType = pTodayPlayer.GameType;
            this.PlayerLevel = pTodayPlayer.PlayerLevel;
            this.State = pTodayPlayer.State;
            this.TicketType = pTodayPlayer.TicketType;
            this.UserType = pTodayPlayer.UserType;
            this.DisplayedTicketType = TicketType[this.TicketType].toString();
            this.DisplayedUserType = UserType[this.UserType].toString();
            this.DisplayedState = TicketState[pTodayPlayer.State].toString();
            this.CreationDate = new Date(pTodayPlayer.CreationDate);
            this.LaneId = pTodayPlayer.LaneId;
            this.LaneName = pTodayPlayer.LaneName;
            this.LaneNumber = pTodayPlayer.LaneNumber;
            this.DisplayedDateTime = this.convertDateToFormat(this.CreationDate);
        }
    }

    private convertDateToFormat(pDate: Date): string {
        const tDate: string = pDate.toLocaleString();
        return `${tDate}`;
    }
}
