export class AuthenticatedUser {
  public id: number;
  public name: string;
  public token: string;
  public refreshToken: string;

  constructor() {
    this.id = -1;
    this.name = '';
    this.token = '';
    this.refreshToken = '';
  }
}
