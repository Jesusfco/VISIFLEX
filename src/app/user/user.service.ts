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
    
    
  
    getUsers(){
        return this._http.get(this.link.url + 'users' + this.access.tokenRequest )
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
  
  }
   