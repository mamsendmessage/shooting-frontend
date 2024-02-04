import { Injectable } from '@angular/core';
import { CommunicationService } from '../communication/communication.service';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { Result } from '../models/enums';
import { User } from '../models/user';
import { UserManagementService } from './user-management.service';
import { APIResponse } from '../models/APIResponse';
import { Constants } from '../models/Constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string = `${Constants.BaseServerUrl}`;

  constructor(private communicationService: CommunicationService,
    private userManagementService: UserManagementService) { }

  public async Login(pCredentials: any): Promise<Result> {
    try {
      let tResult: Result = Result.ERROR;
      const tUrl: string = `${this.url}auth/login`;
      const tResponse: APIResponse = await this.communicationService.postData(tUrl, pCredentials);
      if (tResponse.result == 0) {
        const tAuthenticatedUser: AuthenticatedUser = new AuthenticatedUser(tResponse.payload);
        tResponse.result = this.userManagementService.setUser(tAuthenticatedUser);
      }
      return tResponse.result;
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
