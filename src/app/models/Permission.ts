export class Permission {
    public ID: number;
    public RoleId: number;
    public ScreenId: number;
    constructor(pPermission: Permission = undefined) {
        if (pPermission) {
            this.ID = +pPermission.ID;
            this.RoleId = +pPermission.RoleId;
            this.ScreenId = +pPermission.ScreenId;
        } else {
            this.ID = -1;
            this.RoleId = -1;
            this.ScreenId = -1;
        }
    }
}
