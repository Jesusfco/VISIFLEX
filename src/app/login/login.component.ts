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

  ngOnInit() {
  }

  login(data){
    this._http.check().then(
      data => console.log(data),
      error => console.log(error)
    );
  }

}
