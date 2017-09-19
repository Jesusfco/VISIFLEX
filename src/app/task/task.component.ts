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

  constructor() { }

  ngOnInit() {
  }

}
