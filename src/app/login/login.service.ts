import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';

@Injectable()
export class LoginService {

  public link: Url = new Url();
  
  constructor(private _http: Http) { }


  login(information) {
    return this._http.post(this.link.url + 'login', information)
            .map(data => data.json())
            .toPromise();
  }

  checkAuth() { 
    return this._http.get(this.link.url + 'login/check')
    .map(data => data.json())
    .toPromise();
  }

  

}
