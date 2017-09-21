import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
 
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Array<Task> = [];
  createTaskView:boolean = false;
  selectedTask: Task = new Task();

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

    if(this.tasks[i].id == this.selectedTask.id){
      const data = this.selectedTask.taskProgress;
      this.selectedTask = this.tasks[i];
      this.selectedTask.taskProgress = data;
    }
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

  showTask(task: Task){
    this.selectedTask = task;
    this._http.getProgress(task.id).then(
      data => this.selectedTask.taskProgress = data.progress,
      error => console.log(error)
    )
    
  }

}
