export class PlayerLevel {
    public ID: number;
    public Name: string;
    public GameTypeId: number;
    public Image?: string;
    constructor(pId: number, pName: string, pGameTypeId: number, pImage: string) {
        this.ID = pId;
        this.Name = pName;
        this.GameTypeId = pGameTypeId;
        this.Image = pImage;
    }
}