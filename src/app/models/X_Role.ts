export class X_Role {
    public RoleId: number;
    public Role: string;
    public Screens: string;

    constructor(pRole: X_Role = undefined) {
        if (pRole) {
            this.Role = pRole.Role;
            this.Screens = pRole.Screens;
            this.RoleId = pRole.RoleId;
        } else {
            this.Role = '';
            this.Screens = '';
            this.RoleId = -1;
        }
    }
}
