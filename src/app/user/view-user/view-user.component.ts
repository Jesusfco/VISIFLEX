import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {

    if(this.user.type == 1) this.user.typeView = "Empleado";
    else if(this.user.type == 9) this.user.typeView = "Administrador";
    else if(this.user.type == 10) this.user.typeView = "Super Administrador";
  }

}
