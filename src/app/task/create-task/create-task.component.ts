import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MdSelectModule} from '@angular/material';
import { User } from '../../user/user';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  @Input() user: User;  

  @Output() close = new EventEmitter();
  @Output() createTaskEventEmitter = new EventEmitter();

  view: boolean;

  newTask: Task = new Task();

  levels =[{
            value: 1,
            viewValue: "Bajo"
          },{
            value: 2,
            viewValue: "Medio"
          },{
            value: 1,
            viewValue: "Importante"
          }];
  
  form = {
    form: 0,
    title: 0,
    level: 0,
    nameUser:0,
    userId: 0,
    userInput: 0
  };

  sugests: Array<any> = [];

  

  constructor(private _HTTP: TaskService) { }

  ngOnInit() {
    
    this.view = true;

    if(this.user != null) {

      this.form.userInput = 1;
      this.newTask.userName = this.user.name;
      this.newTask.userId = this.user.id;
      
    }
  }

  closePop(){
    this.close.emit();
  }

  formSubmit(){
    this.form.form = 0;
    this.validateTitle();
    this.validateLevel();
    this.validateName();
    if(this.form.nameUser == 0) this.validateId();
        
  }

  getSugest(event){

    if(event == 38 || event == 40 || event == 13) return;
    if(this.newTask.userName == null || this.newTask.userName == '') return;

    this._HTTP.sugestUsers({name: this.newTask.userName}).then(
      data => {
        this.sugests = data.users;        
      },
      error => console.log(error)
    );
  }

  sendDataNewTask(){
    if(this.form.form == 0){
      this._HTTP.createTask(this.newTask).then(
        data => {
          alert('Tarea asignada correctamente');
          this.createTaskEventEmitter.emit(this.newTask);
          this.closePop();
        },
        error => console.log(error)
      )
    }
  }

  // Validaciones de Formulario {

  validateTitle() {
    this.form.title = 0;
    
    if(this.newTask.title == null || this.newTask.title == '') {
      this.form.title = 1;
      this.form.form = 1;
    }
  }

  validateLevel() {
    this.form.level = 0;
    
    if(this.newTask.level == null) {
      this.form.level = 1;
      this.form.form = 1;
    }
  }

  validateName(){
    this.form.nameUser = 0;
    
    if(this.newTask.userName == null || this.newTask.userName == '') {
      this.form.nameUser = 1;
      this.form.form = 1;
    }
  }

  validateId(){

    this.form.userId = 0;    
    this._HTTP.getIdFromName({name: this.newTask.userName}).then(
      data => {
        if(data.id == null){
          this.form.userId = 1 ;
          this.form.form = 0;  
        } else {
          this.newTask.userId = data.id;
          this.sendDataNewTask();
        }
      },
      error => {
        console.log(error);
        this.form.userId = 1 ;
        this.form.form = 0;
      }
    );
    

    
  }

}
