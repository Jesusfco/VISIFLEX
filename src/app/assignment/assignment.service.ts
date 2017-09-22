import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Storage } from '../Storage';
import { Task } from '../task/task';
import { Url } from '../url';

@Injectable()
export class AssignmentService {

  public link: Url = new Url();
  public access: Storage = new Storage();

  constructor(private _http: Http) { }

  sugestUsers(name) {
    return this._http.post(this.link.url + 'user/sugest' + this.access.tokenRequest, name)
            .map(data => data.json())
            .toPromise();
  }

  createTaskProgress(progress){
    return this._http.post(this.link.url + 'myTask/progress/create' + this.access.tokenRequest, progress)
              .map(data => data.json())
              .toPromise();
  }

  getTasks(structure){
    return this._http.get(this.link.url + 'myTasks' + this.access.tokenRequest, structure)
            .map(data => data.json())
            .toPromise();
  }
  getProgress(taskId){
    return this._http.get(this.link.url + 'task/progress/'+ taskId + this.access.tokenRequest)
            .map(data => data.json())
            .toPromise();
  }

}
