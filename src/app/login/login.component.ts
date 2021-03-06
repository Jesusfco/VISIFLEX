import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { Login } from './login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('focus') private elementRef: ElementRef;
  
  @Output() login = new EventEmitter();

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

  data: Login = new Login();
  form = {
    email: 0,
    password: 0,
    server: 0,
    form: 0,
  };

  constructor(private _http:  LoginService) { }

  ngOnInit() {
    this.ngAfterViewInit();
  }
  accesar() {
    this.form.form = 0;
    this.form.server = 0;
    this.validateMail();
    this.validatePassword();

    if(this.form.form == 1)  return; 

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
        this.login.emit();
      },

      error => {

        this.form.form = 1;

        if(error.status == 401){ this.form.server = 1; } 
        
        else if(error.status == 422){ this.form.server = 2; } 
        
        else if(error.status == 500){ this.form.server = 3; } 
        
        else if(error.status == 0){ this.form.server = 4; }

        console.log(error);
        console.log(error.status)

        
        console.log(this.form);
      }
    );
  }
  
  checkAuth() {
    this._http.checkAuth().then(
      data => console.log(data),
      error => console.log(error)
    );  
  }

  validateMail(){
    this.form.email = 0;
    if(this.data.email == null || this.data.email == '') {
      this.form.email = 1;
      this.form.form = 1;
    }    
  }

  validatePassword(){
    this.form.password = 0;
    if(this.data.password == null || this.data.password == '') {
      this.form.password = 1;
      this.form.form = 1;
    }
  }
  

}
