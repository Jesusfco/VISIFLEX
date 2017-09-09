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
      data => console.log(data),
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
