export class Player {
    public ID: number;
    public Name: string;
    public Age: number;
    public MobileNumber: number;
    public NationalityId: number;
    public CreationDate: Date;
    public Photo: string;
    public Document: string;
    public PassportsNo: string;
    public MembershipNo: string;
    public MembershipExpiry: Date;
    constructor(pPlayer: Player) {
        if (pPlayer) {
            this.ID = pPlayer.ID;
            this.Name = pPlayer.Name;
            this.Age = pPlayer.Age;
            this.MobileNumber = pPlayer.MobileNumber;
            this.NationalityId = pPlayer.NationalityId;
            this.Photo = pPlayer.Photo;
            this.Document = pPlayer.Document;
            this.CreationDate = pPlayer.CreationDate;
            this.PassportsNo = pPlayer.PassportsNo;
            this.MembershipNo = pPlayer.MembershipNo;
            this.MembershipExpiry = pPlayer.MembershipExpiry;
        }
    }
}