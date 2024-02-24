export class AuthenticatedUser {
  public ID: number;
  public Name: string;
  public Token: string;
  public RoleId: number;

  constructor(pAuthenticatedUser: AuthenticatedUser) {
    if (pAuthenticatedUser) {
      this.ID = pAuthenticatedUser.ID;
      this.Name = pAuthenticatedUser.Name;
      this.Token = pAuthenticatedUser.Token;
      this.RoleId = pAuthenticatedUser.RoleId;
    }
  }
}
