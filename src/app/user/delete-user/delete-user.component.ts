import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  @Input() user;
  @Output() deleteUserEvent = new EventEmitter();

  private tasks: number;
  private progresses: number;

  constructor(private _http: UserService) { }

  ngOnInit() {
    this._http.checkBeforeDelete({id: this.user.id}).then(
      data =>{
        this.tasks = data.tasks;
        this.progresses = data.progresses
      },
      error => console.log(error)
    )
  }

  disableUser(){
    this.user.active = 0;
    setTimeout(() => {
      this._http.activeUserCamp(this.user).then(
        data => this.user.delete = !this.user.delete,
        error => {
          console.log(error)
          this.user.active = 1;
          alert('Existe un problema, el usuario no pude ser desactivado');
        }
      )  
    }, 200);
  }

  deleteUser(){
    this._http.deleteUser(this.user).then(
      data => {
        this.deleteUserEvent.emit();
        this.user.delete = !this.user.delete
      } ,
      error => {
        console.log(error)
        this.user.active = 1;
        alert('Existe un problema, el usuario no pude ser Eliminado');
      }
    )  
  }



}
