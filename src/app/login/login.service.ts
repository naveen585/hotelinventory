import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  isLoggedIn : boolean = false;

  Login(email: string, password : string){
    if(email === "admin@gmail.com" && password==="admin"){
     this.isLoggedIn = true;
}
return this.isLoggedIn;
  }
}
