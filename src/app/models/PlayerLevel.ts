export class PlayerLevel {
    public ID: number;
    public Name: string;
    public Image?: string;
    constructor(pId: number, pName: string, pImage: string) {
        this.ID = pId;
        this.Name = pName;
        this.Image = pImage;
    }
}