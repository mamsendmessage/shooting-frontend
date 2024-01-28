import { Injectable } from '@angular/core';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { Result } from '../models/enums';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  constructor() {}

  public getUser(): AuthenticatedUser | null {
    try {
      let tAuthenticatedUser: AuthenticatedUser;
      const tData: string | null = sessionStorage.getItem('user');
      if (tData) {
        tAuthenticatedUser = JSON.parse(tData);
        return tAuthenticatedUser;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public setUser(pUser: AuthenticatedUser): Result {
    try {
      sessionStorage.setItem('user', JSON.stringify(pUser));
      return Result.SUCCESS;
    } catch (error) {
      console.log(error);
      return Result.ERROR;
    }
  }

  public removeUser(): Result {
    try {
      sessionStorage.removeItem('user');
      return Result.SUCCESS;
    } catch (error) {
      console.log(error);
      return Result.ERROR;
    }
  }
}
