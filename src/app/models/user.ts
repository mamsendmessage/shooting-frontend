export class User {
  public ID: number;
  public Name: string;
  public MobileNumber: string;
  public Email: string;
  public Password: string;
  public RoleId: number = -1;
  public RoleName: string;

  constructor(pUser: User = undefined) {
    if (pUser) {
      this.ID = pUser.ID;
      this.Name = pUser.Name;
      this.Email = pUser.Email;
      this.MobileNumber = pUser.MobileNumber;
      this.Password = '';
      this.RoleId = pUser.RoleId;
      this.RoleName = pUser.RoleName;
    } else {
      this.ID = -1;
      this.Name = '';
      this.Email = '';
      this.MobileNumber = '';
      this.Password = '';
      this.RoleId = -1;
      this.RoleName = '';
    }
  }
}
