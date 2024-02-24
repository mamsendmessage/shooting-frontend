import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/Role';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit {

  public isReady: boolean = false;
  public active: number = 1;
  public roles: Role[] = [];
  constructor(private breadcrumbService: BreadcrumbService, private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.breadcrumbService.setBreadcrumb(['Application', 'Admin Console']);
    this.roles = await this.userService.GetAllRoles();
    this.active = 1;
    this.isReady = true;
  }

}
