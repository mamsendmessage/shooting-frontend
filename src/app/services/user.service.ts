import { Injectable } from '@angular/core';
import { CommunicationService } from '../communication/communication.service';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { Result } from '../models/enums';
import { User } from '../models/user';
import { UserManagementService } from './user-management.service';
import { Lane } from '../models/Lane';
import { APIResponse } from '../models/APIResponse';
import { Constants } from '../models/Constants';
import { Skeet } from '../models/Skeet';
import { Screen } from '../models/Screen';
import { Nationality } from '../models/Nationality';
import { Permission } from '../models/Permission';
import { X_Role } from '../models/X_Role';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serviceName: string = 'users';
  private url: string = `${Constants.APIServerUrl}/${this.serviceName}`

  constructor(private communicationService: CommunicationService) {

  }

  public async GetAllUsers() {
    let tUsers: User[] = [];
    try {
      const tUrl: string = `${this.url}`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tUsers.push(new User(element));
        }
      }
      return tUsers;
    } catch (error) {
      console.log(error);
      return tUsers;
    }
  }

  public async GetAllRoles() {
    let tRoles: Role[] = [];
    try {
      const tUrl: string = `${this.url}/roles`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tRoles.push(new Role(element));
        }
      }
      return tRoles;
    } catch (error) {
      console.log(error);
      return tRoles;
    }
  }

  public async GetAllScreens() {
    let tScreens: Screen[] = [];
    try {
      const tUrl: string = `${this.url}/screens`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tScreens.push(new Screen(element));
        }
      }
      return tScreens;
    } catch (error) {
      console.log(error);
      return tScreens;
    }
  }

  public async GetRolesView() {
    let tRoles: X_Role[] = [];
    try {
      const tUrl: string = `${this.url}/rolesViews`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tRoles.push(new X_Role(element));
        }
      }
      return tRoles;
    } catch (error) {
      console.log(error);
      return tRoles;
    }
  }

  public async CreateRole(pRoleName: string, pScreens: string[]) {
    try {
      const tUrl: string = `${this.url}/createRole`;
      const tData: APIResponse = await this.communicationService.postData(tUrl, { role: pRoleName, screens: pScreens });
      return tData.result;
    } catch (error) {
      console.log(error);
      return Result.ERROR;
    }
  }

  public async UpdateRole(pRoleId: number, pRoleName: string, pScreens: string[]) {
    try {
      const tUrl: string = `${this.url}/updateRole`;
      const tData: APIResponse = await this.communicationService.postData(tUrl, { id: pRoleId, role: pRoleName, screens: pScreens });
      return tData.result;
    } catch (error) {
      console.log(error);
      return Result.ERROR;
    }
  }

  public async DeleteRole(pRoleId: number) {
    try {
      const tUrl: string = `${this.url}/DeleteRole`;
      const tResponse: APIResponse = await this.communicationService.postData(tUrl, { id: pRoleId });
      return tResponse.result;
    } catch (error) {
      console.log(error);
      return Result.ERROR;
    }
  }

  public async CreateUser(pUser: User) {
    try {
      const tUrl: string = `${this.url}/createUser`;
      const tData: APIResponse = await this.communicationService.postData(tUrl, pUser);
      return tData.result;
    } catch (error) {
      console.log(error);
      return Result.ERROR;
    }
  }

  public async UpdateUser(pUser: User) {
    try {
      const tUrl: string = `${this.url}/updateUser`;
      const tData: APIResponse = await this.communicationService.postData(tUrl, pUser);
      return tData.result;
    } catch (error) {
      console.log(error);
      return Result.ERROR;
    }
  }

  public async SetPassword(pUser: User) {
    try {
      const tUrl: string = `${this.url}/setPassword`;
      const tData: APIResponse = await this.communicationService.postData(tUrl, pUser);
      return tData.result;
    } catch (error) {
      console.log(error);
      return Result.ERROR;
    }
  }

  public async DeleteUser(pUserId: number) {
    try {
      const tUrl: string = `${this.url}/DeleteUser`;
      const tData: APIResponse = await this.communicationService.postData(tUrl, { id: pUserId });
      return tData.result;
    } catch (error) {
      console.log(error);
      return Result.ERROR;
    }
  }

  public async GetPermissions(pRoleId: number) {
    try {
      const tPermissions: Permission[] = [];
      const tUrl: string = `${this.url}/permissions/` + pRoleId;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tPermissions.push(new Permission(element));
        }
      }
      return tPermissions;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

}
