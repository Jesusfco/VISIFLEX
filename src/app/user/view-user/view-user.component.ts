import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Storage } from '../../storage';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  @Input() user: User;

  userInf = new Storage;

  createTa:boolean = false;
  

  constructor(private _http: UserService) { }

  ngOnInit() {

    if(this.user.type == 1) this.user.typeView = "Empleado";
    else if(this.user.type == 9) this.user.typeView = "Administrador";
    else if(this.user.type == 10) this.user.typeView = "Super Administrador";

    this.createTa = false;
  }

  createTaBoolean(){
    this.createTa = !this.createTa;
  }

  changeActiveCampUser(){
    setTimeout(() => {
      this._http.activeUserCamp(this.user).then(
        data => console.log(data.user),
        error => console.log(error)
      )  
    }, 200);
    
  }

}
