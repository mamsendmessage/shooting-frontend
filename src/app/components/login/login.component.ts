// login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService,private router: Router) {

    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const tValue = {
        Username : this.loginForm.value.Email,
        Password: this.loginForm.value.Password
      }
      const tResult = await this.authenticationService.Login(tValue);
      if(tResult==0){
        this.router.navigate(["home"]);
      }else{
        console.log('Login Faild')
      }
      console.log(tResult);
    }
  }
}
