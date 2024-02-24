import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Role } from '../../../models/Role';
import { User } from '../../../models//user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateRoleDialogComponent } from '../../role-management/create-role-dialog/create-role-dialog.component';
import { Result } from 'src/app/models/enums';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit {

  public userForm: FormGroup;
  public hide = true;
  public hide2 = true;
  public isReady: boolean = false;
  public roles: Role[] = [];
  public actionName: string = '';
  constructor(private fb: FormBuilder, private userService: UserService, @Inject(MAT_DIALOG_DATA) public pData: any,
    public dialogRef: MatDialogRef<CreateDialogComponent>, public dialog: MatDialog) {
  }

  async ngOnInit(): Promise<void> {
    this.roles = await this.userService.GetAllRoles();
    console.log(this.pData);
    if (this.pData.isNew) {
      this.actionName = 'Create';
      this.userForm = this.fb.group({
        Name: ['', Validators.required],
        Email: ['', Validators.required],
        MobileNumber: ['', Validators.required],
        Password: ['', Validators.required],
        ConfirmPassword: ['', Validators.required],
        RoleId: ['', Validators.required],
      });
    } else {
      this.actionName = 'Update';
      const tUser: User = new User(this.pData.user);
      this.userForm = this.fb.group({
        Name: [tUser.Name, Validators.required],
        Email: [tUser.Email, Validators.required],
        MobileNumber: [tUser.MobileNumber, Validators.required],
        RoleId: [tUser.RoleId, Validators.required],
      });
    }

    this.isReady = true;
  }

  public async CreateUser() {
    let tResult: number = Result.ERROR;
    if (this.userForm.valid) {
      const tUser: User = new User();
      tUser.Name = this.userForm.get('Name').value;
      tUser.Email = this.userForm.get('Email').value;
      tUser.MobileNumber = this.userForm.get('MobileNumber').value;

      tUser.RoleId = +this.userForm.get('RoleId').value;
      if (this.pData.isNew) {
        const tPassword: string = this.userForm.get('Password').value;
        const tConfirmPassword: string = this.userForm.get('ConfirmPassword').value;
        if (tPassword == tConfirmPassword) {
          tUser.Password = tPassword;
        } else {
          this.openAlertDialog('Password and Confirm Password not match');
        }
        tResult = await this.userService.CreateUser(tUser);
      } else {
        tUser.ID = this.pData.user.ID;
        tResult = await this.userService.UpdateUser(tUser);
      }
      if (tResult == Result.SUCCESS) {
        this.dialogRef.close();
        location.reload();
      } else {
        this.openAlertDialog('An Error Occuerd while performing you request');
      }
    } else {
      this.getFormValidationErrors();
    }
  }

  openAlertDialog(pMessage: string) {
    this.dialog.open(AlertDialogComponent, {
      data: {
        icon: 'Error',
        message: pMessage
      }
    });
  }

  getFormValidationErrors() {
    Object.keys(this.userForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.userForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError] + " -> " + this.userForm.get(key).value);
        });
      }
    });
  }

}
