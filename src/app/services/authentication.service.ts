import { Injectable } from '@angular/core';
import { CommunicationService } from '../communication/communication.service';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { Result } from '../models/enums';
import { User } from '../models/user';
import { UserManagementService } from './user-management.service';
import { APIResponse } from '../models/APIResponse';
import { Constants } from '../models/Constants';
import { Role } from '../models/Role';
import { X_Role } from '../models/X_Role';
import { Screen } from '../models/Screen';
import { Permission } from '../models/Permission';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string = `${Constants.BaseServerUrl}`;

  constructor(private communicationService: CommunicationService,
    private userManagementService: UserManagementService) { }

  public async Login(pCredentials: any): Promise<Result> {
    try {
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

}
