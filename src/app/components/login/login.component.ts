// login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import { AuthenticatedUser } from 'src/app/models/authenticatedUser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserManagementService } from 'src/app/services/user-management.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private userService: UserService, private router: Router, private usrManagment: UserManagementService) {

    this.loginForm = this.fb.group({
      Username: ['', [Validators.required]],
      Password: ['', Validators.required]
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const tValue = {
        Username: this.loginForm.value.Username,
        Password: this.loginForm.value.Password
      }
      const tResult = await this.authenticationService.Login(tValue);
      if (tResult == 0) {
        const tUser: AuthenticatedUser = this.usrManagment.getUser();
        const tRoleId: number = tUser.RoleId;
        let tResult: boolean = false;
        const tPermissions: Permission[] = await this.userService.GetPermissions(tRoleId);
        for (let index = 0; index < tPermissions.length; index++) {
          const tPermission: Permission = tPermissions[index];
          if (tPermission.ScreenId == 1) {
            this.router.navigate(["/home"]);
            return;
          }
          if (tPermission.ScreenId == 2) {
            this.router.navigate(["/users"]);
            return;
          }
          if (tPermission.ScreenId == 3) {
            this.router.navigate(["/reciption"]);
            return;
          }
          if (tPermission.ScreenId == 4) {
            this.router.navigate(["/tickets"]);
            return;
          }
          if (tPermission.ScreenId == 5) {
            this.router.navigate(["/settings"]);
            return;
          }
          if (tPermission.ScreenId == 6) {
            this.router.navigate(["/admin"]);
            return;
          }
        }

      } else {
        console.log('Login Faild')
      }
      console.log(tResult);
    }
  }

  public CreateAccount() {
    this.router.navigate(["/signup"]);
  }

}
