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
        // return this._http.get(this.urlPrincipal + 'user/getUser')
        //   .map( data => data.json())
        //   .toPromise();


        return [{name: 'JESUS FCO', email: 'JFCR@LIVE.COM', type: 1, id:1, phone: '9611221222', active: true, password: null},
        {name: 'SERGIO RUIZ', email: 'SERGIORU@LIVE.COM', type: 1, id:2, phone: '9611221222', active: true, password: null},
        {name: 'TERESA RODRIGUEZ', email: 'SERGIONO@LIVE.COM', type: 2, id:3, phone: '9611221222', active: true, password: null}];
    }
  
    createUser(usuario) {
      return this._http.post(this.link.url + 'user/createUser', usuario)
              .map(data => data.json())
              .toPromise();
    }

    prueba(){
      return this._http.get(this.link.url + 'user')
              .map( data => data.json())
              .toPromise();   
    }
  
  }
   