import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';

import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() user: User;  
  @Output() editedUserEvent = new EventEmitter();

  userToModify: User = new User();

  userTypes: Array<any> = [{value: 1, viewValue: 'Empleado'},
                          {value: 9, viewValue: 'Administrador'},
                          {value: 10, viewValue: 'Super Administrador'},];

  form = {validate: true, name: 0, email: 0, password: 0, type: 0};  


  constructor(private _http: UserService) { 
    
  }

  ngOnInit() {   
    Object.assign(this.userToModify, this.user);    
  }

  closePop() {
    this.user.modify = false;
  }

  formSubmit() {
    
    this.form.validate = true;        
    this.validateName();              
    
  }


  updateUser(){
    if(this.form.validate == true) {
      
      console.log(this.userToModify);

      this._http.editUser(this.userToModify, this.user.id).then(
        data => {
          if(data == true){
            this.userToModify.password = '';
            this.editedUserEvent.emit(
              {
                original: this.user, 
                edited: this.userToModify
              }
            );
            this.closePop();

          }

        },
        error => console.log(error)

        
      )      
    }
  }
  //Check User to Uppercase()

  checkName(){
    
    if(this.userToModify.name != null)
      this.userToModify.name = this.userToModify.name.toUpperCase();    
  }
  checkMail(){
    if(this.userToModify.email != null)
      this.userToModify.email = this.userToModify.email.toUpperCase();    
  }
  checkEnterprise() {
    if(this.userToModify.enterprise != null)
    this.userToModify.enterprise = this.userToModify.enterprise.toUpperCase();    
  }


//Validaciones  Nombre de Usuario, correo password
    

validateMail(){
  
      this.form.email = 0;
      
      if(this.userToModify.email != null && this.userToModify.email != ''){
  
        if(this.userToModify.email != this.user.email){

          this._http.validatUniqueEmail({ email: this.userToModify.email}).then(
            data => {
              if(data == 1){                
                this.form.validate = false;
                this.form.email = 2;
              } 
              this.updateUser();         
            },
            error => console.log(error)
          )

        } else  if(this.userToModify.email == this.user.email){
          this.updateUser();
        }


        
  
      } else {

        this.form.validate = false;
        this.form.email = 1;

      } 
  
  } //Fin de validate Mail
  
  
    validateName() {
  
      this.form.name = 0;
  
      if(this.userToModify.name != null && this.userToModify.name != ''){

        if(this.userToModify.name != this.user.name) {
        
          this._http.validateUniqueName({ name: this.userToModify.name}).then(
            data => {
    
                this.validateMail();  
            
            }, error => {
    
              console.log(error);              
              this.form.validate = false;
              this.form.name = 2;
    
              this.validateMail();  
    
            } 
          )  
        } else if(this.userToModify.name == this.user.name) {
          this.validateMail();  
        }
      } else if(this.userToModify.name == null || this.userToModify.name == ''){

        this.form.validate = false;
        this.form.name = 1;
      
      }                     
    }
  
  
    validateType() {
  
      this.form.type = 0;
  
      if(this.userToModify.type  == null){
      
        this.form.validate = false;
        this.form.type = 1;
  
      }
  
    }
  
    validatePassword() {
  
      this.form.password = 0;
      if(this.userToModify.password  == null){
        
          this.form.validate = false;
          this.form.password = 1;
    
        }
    }

}
