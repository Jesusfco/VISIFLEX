import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { AssignmentService } from '../assignment.service';
import { TaskProgress  } from '../../task/task-progress';

@Component({
  selector: 'app-create-progress',
  templateUrl: './create-progress.component.html',
  styleUrls: ['./create-progress.component.css']
})
export class CreateProgressComponent implements OnInit {

  progress: TaskProgress = new TaskProgress();
  @Input() id;
  @Output() newProgressEventEmitter = new EventEmitter();
  
  messageValidation: boolean = false;

  constructor(private _http: AssignmentService) { }

  ngOnInit() {
    this.progress.taskId = this.id;
    this.progress.message = '';
    console.log('create progress component init');
  }

  form(){
    if(this.messageValidation == false) return;

    this._http.createTaskProgress(this.progress).then(
      data => {
        this.newProgressEventEmitter.emit(data.progress);
        this.progress.message = '';
        this.validateMessage();
      },
      error => console.log(error)
    );
  }

  validateMessage(){
    if(this.progress.message.toString().length < 10){
      this.messageValidation = false;
    }
    else {
      this.messageValidation = true;
    }
  }

}
