import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmailValidator, FormsModule } from '@angular/forms';
import { HoverDirective } from '../directives/hover.directive';
import { EmailvalidatorDirective } from '../emailvalidator/emailvalidator.directive';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,HoverDirective,EmailvalidatorDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email:string ='';
  password:string='';

  constructor(private route : Router, private loginService: LoginService){

  }

  login(){
    if(this.loginService.Login(this.email,this.password)){
    this.route.navigateByUrl('/rooms');
    }
  }
}
