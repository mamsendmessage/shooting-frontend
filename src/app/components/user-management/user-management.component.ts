import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { Role } from 'src/app/models/Role';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Result } from 'src/app/models/enums';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { UserManagementService } from 'src/app/services/user-management.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SetPasswordDialogComponent } from './set-password-dialog/set-password-dialog.component';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  public isReady: boolean = false;
  public users: User[] = [];
  public userForm: FormGroup;
  public currentUserId: number = -1;
  @Input() public roles: Role[] = [];
  constructor(private userService: UserService, public dialog: MatDialog, private userManagement: UserManagementService,
    private matIconRegistry: MatIconRegistry,
    private domSanitzer: DomSanitizer,) { 

      this.matIconRegistry.addSvgIcon(
        'pass',
        this.domSanitzer.bypassSecurityTrustResourceUrl('assets/img/password.svg')
      );

    }

  async ngOnInit(): Promise<void> {
    this.currentUserId = this.userManagement.getUser().ID;
    this.users = await this.userService.GetAllUsers();
    for (let index = 0; index < this.users.length; index++) {
      const tUser = this.users[index];
      tUser.RoleName = this.roles.find((item) => item.ID == tUser.RoleId).Name;
    }
    this.isReady = true;
  }

  public CreateUser(): void {
    this.dialog.open(CreateDialogComponent, {
      data: {
        isNew: true
      },
      width: "700px",
    })
  }

  public UpdateUser(pUser: User): void {
    this.dialog.open(CreateDialogComponent, {
      data: {
        isNew: false,
        user: pUser,
      },
      width: "700px",
    })
  }

  public SetPassword(pUser: User): void {
    this.dialog.open(SetPasswordDialogComponent, {
      data: {
        user: pUser,
      },
      width: "700px",
    })
  }


  public async DeleteUser(pUser: User): Promise<void> {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Action',
        message: `Are you sure you want to do delete ${pUser.Name} user ? `
      }
    });

    dialogRef.afterClosed().subscribe(async dialogResult => {
      if (dialogResult) {
        const tResult = await this.userService.DeleteUser(pUser.ID);
        if (tResult == Result.SUCCESS) {
          location.reload();
        } else {
          this.dialog.open(AlertDialogComponent, {
            data: {
              icon: 'Error',
              message: "An error occurred while performing request"
            }
          })
        }

      }
    });
  }

}
