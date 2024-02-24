import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserManagementService } from '../services/user-management.service';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { AuthenticationService } from '../services/authentication.service';
import { Permission } from '../models/Permission';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {


  public async map(): Promise<boolean> {
    const tUser: AuthenticatedUser = this.userManagementService.getUser();
    if (tUser) {
      const tRoleId: number = tUser.RoleId;
      let tResult: boolean = false;
      const tPermissions: Permission[] = await this.userService.GetPermissions(tRoleId);
      tResult = tPermissions.findIndex((item) => item.ScreenId == 1) != -1;
      return tResult;
    } else {
      return false;
    }
  }

  constructor(private userManagementService: UserManagementService, private userService: UserService, private router: Router) { }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const tUser: AuthenticatedUser = this.userManagementService.getUser();
    if (tUser) {
      let tScreenId: number = -1;
      if (route.url.toString().includes("home")) {
        tScreenId = 1;
      } else if (route.url.toString().includes("users")) {
        tScreenId = 2;
      } else if (route.url.toString().includes("reciption")) {
        tScreenId = 3;
      } else if (route.url.toString().includes("tickets")) {
        tScreenId = 4;
      } else if (route.url.toString().includes("settings")) {
        tScreenId = 5;
      } else if (route.url.toString().includes("admin")) {
        tScreenId = 6;
      }
      const tRoleId: number = tUser.RoleId;
      let tResult: boolean = false;
      const tPermissions: Permission[] = await this.userService.GetPermissions(tRoleId);
      tResult = tPermissions.findIndex((item) => item.ScreenId == tScreenId) != -1;
      return tResult;
    } else {
      return false;
    }
  }

}
