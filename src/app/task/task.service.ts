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
  getIdFromName(name){
    return this._http.post(this.link.url + 'user/findId' + this.access.tokenRequest, name)
    .map(data => data.json())
    .toPromise();
  }

  sugestUsers(name) {
    return this._http.post(this.link.url + 'user/sugest' + this.access.tokenRequest, name)
            .map(data => data.json())
            .toPromise();
  }

  createTask(task){
    return this._http.post(this.link.url + 'task/create' + this.access.tokenRequest, task)
              .map(data => data.json())
              .toPromise();
  }

  getTasks(structure){
    return this._http.get(this.link.url + 'task/getTasks' + this.access.tokenRequest, structure)
            .map(data => data.json())
            .toPromise();
  }
  getProgress(taskId){
    return this._http.get(this.link.url + 'task/progress/'+ taskId + this.access.tokenRequest)
            .map(data => data.json())
            .toPromise();
  }

  update(task){
    return this._http.put(this.link.url + 'task/update' + this.access.tokenRequest, task)
              .map(data => data.json())
              .toPromise();
  }

  delete(task){
    return this._http.delete(this.link.url + 'task/delete/'+task.id + this.access.tokenRequest, task)
              .map(data => data.json())
              .toPromise();
  }

}
