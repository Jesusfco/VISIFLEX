import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-progress',
  templateUrl: './delete-progress.component.html',
  styleUrls: ['./delete-progress.component.css']
})
export class DeleteProgressComponent implements OnInit {

  @Input() progress;
  @Output() deleteEventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteProgress(){
    this.deleteEventEmitter.emit(this.progress);
  }

  cancel(){
    this.progress.delete = false;
  }
}
