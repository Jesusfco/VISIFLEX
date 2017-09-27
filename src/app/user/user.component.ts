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

  search = {
    toSearch: '',    
    date: 'desc',
    id:'desc',
    page: 1,
    last_page: 0,
    total: 0,
    paginate: 20,
  }

  pages: Array<number> = [];


  public createUserView:boolean = false;

  

  constructor(private _http: UserService) { 

   this.searchUser();

    
          
    
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


  update(modify:any){

    const i = this.users.indexOf(modify.original);
    this.users[i] = modify.edited;
    this.users[i].modify = false;

  }

  searchUser(){
    this._http.getUsers({search: this.search}).then(
      data => {
        this.users = data.data;
        this.search.page = data.current_page;
        this.search.last_page = data.last_page;
        this.search.total = data.total;

        this.pages = [];
        for(let x = 0; x < data.last_page; x++){
          this.pages[x] = x + 1;
        }

      },
      error => console.log(error)
    )
  }

}
