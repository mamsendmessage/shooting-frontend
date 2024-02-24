import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Role } from '../../models/Role';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CreateRoleDialogComponent } from './create-role-dialog/create-role-dialog.component';
import { X_Role } from 'src/app/models/X_Role';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Result } from 'src/app/models/enums';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {

  public isReady: boolean = false;
  public userForm: FormGroup;
  @Input() public roles: Role[] = [];
  public rolesView: X_Role[] = []
  constructor(private userService: UserService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.rolesView = await this.userService.GetRolesView();
    this.isReady = true;
  }

  public async UpdateRole(pRole: X_Role) {
    try {
      this.dialog.open(CreateRoleDialogComponent, {
        data: {
          isNew: false,
          roleId: pRole.RoleId,
          roleName: pRole.Role,
          screens: pRole.Screens
        },
        width: "700px",
      });
    } catch (error) {
      console.log(error);
    }
  }

  public CreateRole(): void {
    try {
      this.dialog.open(CreateRoleDialogComponent, {
        data: {
          isNew: true
        },
        width: "700px",
      })
    } catch (error) {
      console.log(error);
    }
  }

  public async DeleteRole(pRole: X_Role) {
    try {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirm Action',
          message: `Are you sure you want to do delete ${pRole.Role} Role ? `
        }
      });

      dialogRef.afterClosed().subscribe(async dialogResult => {
        if (dialogResult) {
          const tResult = await this.userService.DeleteRole(pRole.RoleId);
          if (tResult == Result.SUCCESS) {
            location.reload();
          } else {
            this.dialog.open(AlertDialogComponent, {
              data: {
                icon: 'Error',
                message: "An error occurred while performing request, Please make sure to deallocate this role from all users before"
              }
            })
          }

        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
