import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() user;
  @Input() users: Array<User>;

  public userToModify: User;

  userTypes: Array<any> = [{value: 1, viewValue: 'Empleado'},
                          {value: 9, viewValue: 'Administrador'},
                          {value: 10, viewValue: 'Super Administrador'},];

  form = {validate: false, name: 0, email: 0, password: 0, type: 0};  


  constructor() { 

    
  }

  ngOnInit() {

    this.userToModify = this.user;
  }

  closePop() {
    this.user.modify = false;
  }

  formSubmit() {

    console.log(this.userToModify);
    // this.form.validate = true;

    

    // this.validateMail();
    // this.validateName();
    // this.validateType();
    // this.validatePassword();

    // if(this.form.validate == true) {

    //   this.create.emit(this.newUser);
      
    //   this.closePop();
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
  
        for(let user of this.users){
          
          if(user.email == this.userToModify.email) {
          
            alert('Mail Ya asignado');
            this.form.validate = false;
            this.form.email = 2;
  
          }
  
        }
  
      } else {
        this.form.validate = false;
        this.form.email = 1;
      } 
  
    } //Fin de validate Mail
  
  
    validateName() {
  
      this.form.name = 0;
  
      if(this.userToModify.name != null && this.userToModify.name != ''){
        
              for(let user of this.users){
                
                if(user.name == this.userToModify.name) {
                
                  
                  this.form.validate = false;
                  this.form.name = 2;
        
                }
        
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
