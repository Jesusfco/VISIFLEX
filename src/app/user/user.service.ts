import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";
import { User } from './user';
import { Storage } from '../Storage';

import { Url } from '../url';
@Injectable()
export class UserService {

    public link: Url = new Url();
    public access: Storage = new Storage();
  
    constructor(private _http: Http) { }
    
    
  
    getUsers(search){
        return this._http.get(this.link.url + 'users' + this.access.tokenRequest, search )
          .map( data => data.json())
          .toPromise();        
    }
  
    createUser(usuario) {
      return this._http.post(this.link.url + 'user/createUser' + this.access.tokenRequest, usuario)
              .map(data => data.json())
              .toPromise();
    }

    editUser(usuario, id){
      return this._http.put(this.link.url + 'user/' + id + this.access.tokenRequest, usuario)
              .map( data => data.json())
              .toPromise();   
    }

    activeUserCamp(user){
      return this._http.post(this.link.url + 'user/' + user.id + "/activeUser" + this.access.tokenRequest, user)
              .map( data => data.json())
              .toPromise();     
    }

    validatUniqueEmail(email){
      return this._http.post(this.link.url + 'user/mailExist' + this.access.tokenRequest, email)
              .map( data => data.json())
              .toPromise();   
    }

    validateUniqueName(name){
      return this._http.post(this.link.url + 'user/nameExist' + this.access.tokenRequest, name)
                  .map( data => data.json())
                  .toPromise(); 
    }

    checkBeforeDelete(id){
      return this._http.post(this.link.url + 'user/checkBeforeDelete' + this.access.tokenRequest, id)
                .map( data => data.json())
                .toPromise(); 
    }
    deleteUser(user){
      return this._http.post(this.link.url + 'user/delete' + this.access.tokenRequest, user)
      .map( data => data.json())
      .toPromise(); 
    }
  
  }
   