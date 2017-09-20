import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  @Input() task: Task;
  @Output() closeEventEmitter =  new EventEmitter();
  @Output() modifyEventEmitter = new EventEmitter();

  modifyTask: Task = new Task();
  
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
    };
  
    sugests: Array<any> = [];

  constructor(private _HTTP: TaskService) { 
    
  }

  ngOnInit() {
    Object.assign(this.modifyTask, this.task);  
  }

  closePop(){
    this.closeEventEmitter.emit();
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
        if(this.modifyTask.userName == null || this.modifyTask.userName == '') return;
    
        this._HTTP.sugestUsers({name: this.modifyTask.userName}).then(
          data => {
            this.sugests = data.users;        
          },
          error => console.log(error)
        );
    }

   // Validaciones de Formulario {

    validateTitle() {
      this.form.title = 0;
      
      if(this.modifyTask.title == null || this.modifyTask.title == '') {
        this.form.title = 1;
        this.form.form = 1;
      }
    }
  
    validateLevel() {
      this.form.level = 0;
      
      if(this.modifyTask.level == null) {
        this.form.level = 1;
        this.form.form = 1;
      }
    }
  
    validateName(){
      this.form.nameUser = 0;
      
      if(this.modifyTask.userName == null || this.modifyTask.userName == '') {
        this.form.nameUser = 1;
        this.form.form = 1;
      }
    }
  
    validateId(){
  
      this.form.userId = 0;    
      this._HTTP.getIdFromName({name: this.modifyTask.userName}).then(
        data => { 
          if(data.id == null){
            this.form.userId = 1 ;
            this.form.form = 1;  
          } else {
            this.modifyTask.userId = data.id;
            this.sendEditedTask();
          }
        },
        error => {
          console.log(error);
          this.form.userId = 1 ;
          this.form.form = 0;
        }
      ); 

    }

    sendEditedTask(){
      if(this.form.form == 0){
        this._HTTP.update(this.modifyTask).then(
          data => {
            this.modifyEventEmitter.emit({original: this.task, edited: data.task});
            this.closePop();
          },
          error => console.log(error)
        );
        
      }
    }

}
