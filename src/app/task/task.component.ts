import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';

import { Task } from './task';
import { TaskService } from './task.service';
import { TaskProgress } from './task-progress';
 
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  animations: [
    trigger('taskCard', [
      state('initial', style({
        transform: 'translate3d(0,0,0)',
        visibility: 'visible'
      })),

      state('final' ,style({
        transform: 'translate3d(-100%,0,0)',
        visibility: 'hidden'
      })),

      transition('initial <=> final' , animate('200ms ease-out')),
    ]),
        
  ]


})
export class TaskComponent implements OnInit {

  tasks: Array<Task> = [];
  createTaskView:boolean = false;
  selectedTask: Task = new Task();  
  showCreateProgress: boolean = false;

  taskCardAnimation: string = 'initial';

  search = {
    toSearch: '',
    type: 0,
    date: 'desc',
    id:'desc',
    page: 1,
    last_page: 0,
    total: 0,
    paginate: 20,
  }

  sugests: Array<any> = [];
  pages: Array<number> = [];

  constructor(private _http: TaskService) {
   
   }

  ngOnInit() {    
    this.searchTasks();    
  }

  modifyTask(data: any){   
    const i = this.tasks.indexOf(data.original);
    this.tasks[i] = data.edited;
    this.tasks[i].modify = false;

    if(this.tasks[i].id == this.selectedTask.id){
      this.showTask(this.tasks[i]);
      // const data = this.selectedTask.taskProgress;
      // this.selectedTask = this.tasks[i];
      // this.selectedTask.taskProgress = data;
    }
  }

  createTask(task: Task) {
    this.tasks.unshift(task);    
  }

  newProgress(progress: TaskProgress){
    this.selectedTask.taskProgress.unshift(progress);
    this.showCreateProgress = !this.showCreateProgress;
    this.selectedTask.taskProgressLenght = Object.keys(this.selectedTask.taskProgress).length;
  
    
  }

  deleteTask(task){

    
    this._http.delete(task).then(
      data => {
        console.log(data.message);
        const i = this.tasks.indexOf(task);
        this.tasks.splice(i, 1);
      },
      error => console.log(error)
    );
  }

  showTask(task: Task){
   
    this._http.getProgress(task.id).then(
      data => {
        this.selectedTask = task;
        this.selectedTask.taskProgress = data.progress;        
                 
        this.selectedTask.taskProgressLenght = Object.keys(data.progress).length;

        this.getProgressSelectTask();
        this.getVerifiedTaskProgress();

        if(this.selectedTask.taskProgressVerified == 0) {
          this.selectedTask.progress = 0;
        }
      },
      error => console.log(error)
    )

    this.animationTask();
    
    
  }


  updateProgress(data){    
    const i = this.selectedTask.taskProgress.indexOf(data.original);
    this.selectedTask.taskProgress[i] = data.edited;    

    this.getProgressSelectTask();
    this.getVerifiedTaskProgress();
  }

  getProgressSelectTask(){
        
    for(let x of this.selectedTask.taskProgress){
      if(x.progress != null && x.progress > 0) {        
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

  getSugest(event){
    
        if(event == 38 || event == 40 || event == 13) return;
        if(this.search.toSearch == null || this.search.toSearch == '') return;
    
        this._http.sugestUsers({name: this.search.toSearch}).then(
          data => {
            this.sugests = data.users;        
          },
          error => console.log(error)
        );
  }
  
  cleanToSearch(){
      this.search.toSearch = '';
  }

  animationTask(){
    if(window.screen.width < 750)
      this.taskCardAnimation = (this.taskCardAnimation === 'initial' ? 'final' : 'initial');
  }

}

  

