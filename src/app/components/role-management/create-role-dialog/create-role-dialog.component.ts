import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/models/Role';
import { Screen } from 'src/app/models/Screen';
import { Result } from 'src/app/models/enums';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-role-dialog',
  templateUrl: './create-role-dialog.component.html',
  styleUrls: ['./create-role-dialog.component.css']
})
export class CreateRoleDialogComponent implements OnInit {

  public roleForm: FormGroup;
  public hide = true;
  public hide2 = true;
  public isReady: boolean = false;
  public screens: Screen[] = [];
  public actionName: string = '';
  constructor(private fb: FormBuilder, private userService: UserService, @Inject(MAT_DIALOG_DATA) public pData: any,
    public dialogRef: MatDialogRef<CreateRoleDialogComponent>, public dialog: MatDialog) {
  }

  async ngOnInit(): Promise<void> {
    this.screens = await this.userService.GetAllScreens();
    if (this.pData.isNew) {
      this.actionName = 'Create';
      this.roleForm = this.fb.group({
        Name: ['', Validators.required],
        PlatformAccess: ['', Validators.required]
      });
    } else {
      this.actionName = 'Update';
      const tScreensId: number[] = [];
      if (this.pData.screens && this.pData.screens.length > 0) {
        const tScreensName: string[] = this.pData.screens.split(',');
        for (let index = 0; index < tScreensName.length; index++) {
          const tScreenName: string = tScreensName[index];
          const tScreen: Screen = this.screens.find((item) => item.Name == tScreenName);
          if (tScreen) {
            tScreensId.push(tScreen.ID);
          }
        }
      }
      this.roleForm = this.fb.group({
        Name: [this.pData.roleName, Validators.required],
        PlatformAccess: [tScreensId, Validators.required]
      });
    }
    this.isReady = true;
  }

  public async CreateRole() {
    let tResult;
    if (this.roleForm.valid) {
      const tRoleName = this.roleForm.get('Name').value;
      const tScreensId = this.roleForm.get('PlatformAccess').value;
      if (this.pData.isNew) {
        tResult = await this.userService.CreateRole(tRoleName, tScreensId);
      } else {
        tResult = await this.userService.UpdateRole(this.pData.roleId, tRoleName, tScreensId);
      }
      if (tResult == Result.SUCCESS) {
        this.close();
      } else {
        this.openAlertDialog('An Error Occuerd while performing you request');
      }
    }
  }
  public close() {
    this.dialogRef.close();
    location.reload();
  }

  openAlertDialog(pMessage: string) {
    this.dialog.open(AlertDialogComponent, {
      data: {
        icon: 'Error',
        message: pMessage
      }
    });
  }
}
