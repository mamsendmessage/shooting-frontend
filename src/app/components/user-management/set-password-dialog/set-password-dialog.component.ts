import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/models/Role';
import { Result } from 'src/app/models/enums';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-set-password-dialog',
  templateUrl: './set-password-dialog.component.html',
  styleUrls: ['./set-password-dialog.component.css']
})
export class SetPasswordDialogComponent implements OnInit {

  public userForm: FormGroup;
  public hide = true;
  public hide2 = true;
  public isReady: boolean = false;
  public roles: Role[] = [];
  public actionName: string = '';
  constructor(private fb: FormBuilder, private userService: UserService, @Inject(MAT_DIALOG_DATA) public pData: any,
    public dialogRef: MatDialogRef<SetPasswordDialogComponent>, public dialog: MatDialog) {
  }

  async ngOnInit(): Promise<void> {

    this.userForm = this.fb.group({
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
    });
    this.isReady = true;
  }

  public async SetPassword() {
    let tResult: number = Result.ERROR;
    if (this.userForm.valid) {
      const tUser: User = new User();
      const tPassword: string = this.userForm.get('Password').value;
      const tConfirmPassword: string = this.userForm.get('ConfirmPassword').value;
      if (tPassword == tConfirmPassword) {
        tUser.Password = tPassword;
      } else {
        this.openAlertDialog('Password and Confirm Password not match');
      }
      tUser.ID = this.pData.user.ID;
      tResult = await this.userService.SetPassword(tUser);
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
