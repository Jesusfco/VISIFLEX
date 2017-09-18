import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";
import { User } from './user';

import { Url } from '../url';
@Injectable()
export class UserService {

    public link: Url = new Url();
  
    constructor(private _http: Http) { }
    
    
  
    getUsers(){
        return this._http.get(this.link.url + 'users')
          .map( data => data.json())
          .toPromise();


        
    }
  
    createUser(usuario) {
      return this._http.post(this.link.url + 'user/createUser', usuario)
              .map(data => data.json())
              .toPromise();
    }

    editUser(usuario, id){
      return this._http.put(this.link.url + 'user/' + id, usuario)
              .map( data => data.json())
              .toPromise();   
    }
  
  }
   