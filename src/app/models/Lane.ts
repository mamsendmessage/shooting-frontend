export class Lane {
    public ID: number;
    public Name: string;
    public Number: number;
    public isReserved: boolean = false;
    public CreationDate: Date;
    public isSelected: boolean = false;
    public RemainingMinuts: number = 0;
    constructor(pLane: Lane) {
        this.ID = pLane.ID;
        this.Name = pLane.Name;
        this.Number = pLane.Number;
        this.CreationDate = pLane.CreationDate;
    }
}