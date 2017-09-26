import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task';
import { AssignmentService } from './assignment.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  tasks: Array<Task> = [];
  createTaskView:boolean = false;
  selectedTask: Task = new Task();
  createProgress:boolean = false;

  constructor(private _http: AssignmentService) { }

  ngOnInit() {
    this._http.getTasks({something: null}).then(
      data => this.tasks = data.tasks,
      error => console.log(error)
    )
  }

  

  

  

  showTask(task: Task){
   
    this._http.getProgress(task.id).then(
      data => {
        this.selectedTask = task;
        this.selectedTask.taskProgress = data.progress;        
                 
        this.selectedTask.taskProgressLenght = Object.keys(data.progress).length;

        this.getProgressSelectTask();
        this.getVerifiedTaskProgress();
        this.createProgress = false;
        setTimeout(() => {
          this.createProgress = true;
      }, 100);
        

        if(this.selectedTask.taskProgressVerified == 0) {
          this.selectedTask.progress = 0;
        }

        // this.createProgress = true;
      },
      error => console.log(error)
    )
    
  }


  

  getProgressSelectTask(){    
    for(let x of this.selectedTask.taskProgress){
      if(x.progress != null) {        
        this.selectedTask.progress = x.progress;                   
        return;
        
      } else {
        x.progress = 0;
      }
    }
  }

  getVerifiedTaskProgress(){

    this.selectedTask.taskProgressVerified = 0;
    for(let x of this.selectedTask.taskProgress){
      if(x.progress != null) 
        this.selectedTask.taskProgressVerified++;
                     
    }
  }

  newProgress(progress){
    this.selectedTask.taskProgress.unshift(progress);
    console.log(progress);
  }


}
