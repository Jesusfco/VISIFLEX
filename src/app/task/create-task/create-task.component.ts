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
  @Input() view: boolean;

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
          
  

  constructor() { }

  ngOnInit() {
  }

}
