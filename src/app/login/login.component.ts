import { Component, OnInit } from '@angular/core';

import { Login } from './login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: Login = new Login();

  constructor(private _http:  LoginService) { }
th
  ngOnInit() {
  }
  accesar() {
    this._http.login(this.data).then(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userPhone', data.user.phone);
        localStorage.setItem('userEnterprise', data.user.enterprise);
        localStorage.setItem('userType', data.user.type);
        localStorage.setItem('userActive', data.user.active);
        console.log(data);
      },
      error => console.log(error)
    );
  }
  
  checkAuth() {
    this._http.checkAuth().then(
      data => console.log(data),
      error => console.log(error)
    );  
  }

  

}
