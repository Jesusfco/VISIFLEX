import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskProgress } from '../task-progress';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-edit-progress',
  templateUrl: './edit-progress.component.html',
  styleUrls: ['./edit-progress.component.css']
})
export class EditProgressComponent implements OnInit {

  @Input() progress: TaskProgress;
  @Output() updateProgressEvent = new EventEmitter();
  check = {
    form: 0,
    progress: 0
  };

  public newProgress: TaskProgress = new TaskProgress();


  constructor(private _http: TaskService) { }

  ngOnInit() {
    Object.assign(this.newProgress, this.progress);  
  }

  form(){
    this.check.progress = 0;
    this.check.form = 0;

    if(this.newProgress.progress == 0 || this.newProgress.progress == null){

      this.check.progress = 1;
      this.check.form = 1;
    }

    if(this.check.form == 0){
      this._http.updateProgress(this.newProgress).then(
        data => {
          this.updateProgressEvent.emit({original: this.progress, edited: data.progress});
        },
        error => console.log(error)
      );
    }
    
  }

}