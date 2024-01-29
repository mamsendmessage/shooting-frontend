export class Lane {
    public ID: number;
    public Name: string;
    public Number: number;
    public CreationDate: Date;
    constructor(pLane: Lane) {
        this.ID = pLane.ID;
        this.Name = pLane.Name;
        this.Number = pLane.Number;
        this.CreationDate = pLane.CreationDate;
    }
}