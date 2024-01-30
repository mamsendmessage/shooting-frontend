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
    constructor(pTodayPlayer: X_TodayPlayer) {
        this.UserId = pTodayPlayer.UserId;
        this.Photo = pTodayPlayer.Photo;
        this.Name = pTodayPlayer.Name;
        this.GameType = pTodayPlayer.GameType;
        this.PlayerLevel = pTodayPlayer.PlayerLevel;
        this.State = pTodayPlayer.State;
        this.TicketType = pTodayPlayer.TicketType;
        this.UserType = pTodayPlayer.UserType;
        this.DisplayedTicketType = TicketType[this.TicketType].toString();
        this.DisplayedUserType = UserType[this.TicketType].toString();
        this.DisplayedState = TicketState[pTodayPlayer.State].toString();
        this.CreationDate = new Date(pTodayPlayer.CreationDate);
        this.LaneId = pTodayPlayer.LaneId;
        this.DisplayedDateTime = this.convertDateToFormat(this.CreationDate);
    }

    private convertDateToFormat(pDate: Date): string {
        const tDate: string = pDate.toLocaleString();
        return `${tDate}`;
    }
}
