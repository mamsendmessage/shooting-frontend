export class User {
  public Id: number;
  public FullName: string;
  public MobileNumber: string;
  public Password: string;
  public TypeId: number;

  constructor() {
    this.Id = -1;
    this.FullName = '';
    this.MobileNumber = '';
    this.Password = '';
    this.TypeId = -1;
  }
}
