import { Component, OnInit, Input } from '@angular/core';

import {User} from './user';
import {UserService} from './user.service';

import "rxjs";
import { Observable } from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Array<any>;


  public createUserView:boolean = false;

  

  constructor(private _http: UserService) { 

    this.users = this._http.getUsers();

    this._http.prueba().then(
      data => console.log(data),
      error => console.log(error)
    );
          
    
  }

  ngOnInit() {

    this.createUserView = false;
  }


  createUserView2(){
    this.createUserView = !this.createUserView;
  }

  onCloseCreate($event: any) {
    this.createUserView = false;
  }

}
