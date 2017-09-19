import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Storage } from '../Storage';
import { Task } from './task';
import { Url } from '../url';

@Injectable()
export class TaskService {

  public link: Url = new Url();
  public access: Storage = new Storage();

  constructor(private _http: Http) { }

  findUser(usuario) {
    return this._http.post(this.link.url + 'user/find' + this.access.tokenRequest, usuario)
            .map(data => data.json())
            .toPromise();
  }
  getIdFromName(id){
    return this._http.post(this.link.url + 'user/findId' + this.access.tokenRequest, id)
    .map(data => data.json())
    .toPromise();
  }

  sugestUsers(name) {
    return this._http.post(this.link.url + 'user/sugest' + this.access.tokenRequest, name)
            .map(data => data.json())
            .toPromise();
  }

}
