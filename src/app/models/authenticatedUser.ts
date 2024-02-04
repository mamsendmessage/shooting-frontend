export class AuthenticatedUser {
  public ID: number;
  public Name: string;
  public Token: string;

  constructor(pAuthenticatedUser: AuthenticatedUser) {
    if (pAuthenticatedUser) {
      this.ID = pAuthenticatedUser.ID;
      this.Name = pAuthenticatedUser.Name;
      this.Token = pAuthenticatedUser.Token;
    }
  }
}
