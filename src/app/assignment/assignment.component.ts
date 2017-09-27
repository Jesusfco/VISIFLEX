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

  search = {
    toSearch: '',    
    date: 'desc',
    id:'desc',
    page: 1,
    last_page: 0,
    total: 0,
    paginate: 20,
  }

  pages: Array<number> = [];

  constructor(private _http: AssignmentService) { }

  ngOnInit() {
    this.searchTasks(); 
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
      if(x.progress != null || x.progress > 0) {        
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
      if(x.progress > 0) 
        this.selectedTask.taskProgressVerified++;
                     
    }
  }

  newProgress(progress){
    this.selectedTask.taskProgress.unshift(progress);
    setTimeout(() => {
      this.getProgressSelectTask();
      this.getVerifiedTaskProgress();
    }, 800);
    
  }

  searchTasks(){
    this._http.getTasks({search: this.search}).then(
      data => {
        this.tasks = data.tasks.data;
        this.search.page = data.tasks.current_page;
        this.search.last_page = data.tasks.last_page;
        this.search.total = data.tasks.total;

        this.pages = [];
        for(let x = 0; x < data.tasks.last_page; x++){
          this.pages[x] = x + 1;
        }

      },
      error => console.log(error)
    )
    
  }


  

  


}
