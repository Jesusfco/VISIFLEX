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

  users: Array<User>;


  public createUserView:boolean = false;

  

  constructor(private _http: UserService) { 

    this._http.getUsers().then(
      data => this.users = data,
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

  createUser($event: User) {
    this._http.createUser($event).then(
      data => this.users.push(data),
      error => console.log(error)
    );
    
  }

}
