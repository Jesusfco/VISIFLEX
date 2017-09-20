import { Component, OnInit, Input } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
 
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() tasks: Array<Task>;

  constructor(private _http: TaskService) { }

  ngOnInit() {
    this._http.getTasks({something: null}).then(
      data => this.tasks = data.tasks,
      error => console.log(error)
    )
  }

  modifyTask(data: any){   
    const i = this.tasks.indexOf(data.original);
    this.tasks[i] = data.edited;
    this.tasks[i].modify = false;
  }

  createTask(task: Task) {
    this.tasks.push(task);
  }

  deleteTask(data){

    console.log(data);
    this._http.delete(data).then(
      data => {
        console.log(data.message);
        const i = this.tasks.indexOf(data);
        this.tasks.splice(i, 1);
      },
      error => console.log(error)
    );
  }

}
