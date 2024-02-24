export class Screen {
    public ID: number;
    public Name: string;

    constructor(pUser: Screen = undefined) {
        if (pUser) {
            this.ID = pUser.ID;
            this.Name = pUser.Name;
        } else {
            this.ID = -1;
            this.Name = '';
        }
    }
}
