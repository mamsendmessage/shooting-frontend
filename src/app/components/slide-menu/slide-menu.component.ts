import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/Permission';
import { AuthenticatedUser } from 'src/app/models/authenticatedUser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserManagementService } from 'src/app/services/user-management.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.css']
})
export class SlideMenuComponent implements OnInit {

  @Input() public currentTab: string = 'Home';
  public isHomeEnabled: boolean = false;
  public isPlayersEnabled: boolean = false;
  public isReceptionEnabled: boolean = false;
  public isTicketsEnabled: boolean = false;
  public isSettingsEnabled: boolean = false;
  public isAdminEnabled: boolean = false;


  constructor(private router: Router, private userService: UserService, private userManagementService: UserManagementService) { }

  async ngOnInit(): Promise<void> {
    const tUser: AuthenticatedUser = this.userManagementService.getUser();
    const tPermissions: Permission[] = await this.userService.GetPermissions(tUser.RoleId);
    this.isHomeEnabled = tPermissions.findIndex((item) => item.ScreenId == 1) != -1;
    console.log(this.isHomeEnabled)
    this.isPlayersEnabled = tPermissions.findIndex((item) => item.ScreenId == 2) != -1;
    this.isReceptionEnabled = tPermissions.findIndex((item) => item.ScreenId == 3) != -1;
    this.isTicketsEnabled = tPermissions.findIndex((item) => item.ScreenId == 4) != -1;
    this.isSettingsEnabled = tPermissions.findIndex((item) => item.ScreenId == 5) != -1;
    this.isAdminEnabled = tPermissions.findIndex((item) => item.ScreenId == 6) != -1;
  }

  public navigate(pPath: string) {
    this.router.navigate([pPath])
      .then(() => {
        window.location.reload();
      });
  }

}
