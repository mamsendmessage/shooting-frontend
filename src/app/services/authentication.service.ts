import { Injectable } from '@angular/core';
import { CommunicationService } from '../communication/communication.service';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { Result } from '../models/enums';
import { User } from '../models/user';
import { UserManagementService } from './user-management.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private communicationService: CommunicationService,
    private userManagementService: UserManagementService) { }

  public async Login(pCredentials:any): Promise<Result> {
    try {
      let tResult: Result = Result.ERROR;

      const tUrl: string = 'http://localhost:2024/auth/login';
      const tData = await this.communicationService.postData(tUrl, pCredentials);
      if (tData) {
        const tAuthenticatedUser: AuthenticatedUser = tData;
        tResult = this.userManagementService.setUser(tAuthenticatedUser);
      }
      return tResult;
    } catch (error) {
      console.log(error);
      return Result.ERROR;
    }
  }

  public async SignUp(pUser: User): Promise<Result> {
    try {
      let tResult: Result = Result.ERROR;
      const tUrl: string = 'http://serverip:port//signup';
      const tData = await this.communicationService.postData(tUrl, pUser);
      return Result.SUCCESS;
    } catch (error) {
      console.log(error);
      return Result.ERROR;
    }
  }
}
