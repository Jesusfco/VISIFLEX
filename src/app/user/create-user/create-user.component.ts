import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() users: Array<any>;
  view: boolean = true;

  newUser: User = new User();
  userTypes: Array<any> = [{value: 1, viewValue: 'Empleado'},
                           {value: 9, viewValue: 'Administrador'},
                           {value: 10, viewValue: 'Super Administrador'},]    ;
  
  form = {validate: false, name: 0, email: 0, password: 0, type: 0};                           


  constructor() {    
   }

  ngOnInit() {
    
  }


  closePop(){
    this.close.emit(null);
    this.view = false;
  }

  formSubmit() {
    this.form.validate = true;

    

    this.validateMail();
    this.validateName();
    this.validateType();
    this.validatePassword();

    if(this.form.validate == true) {

      this.create.emit(this.newUser);
      
      this.closePop();
    }
    
  }

  checkName(){

    if(this.newUser.name != null)
      this.newUser.name = this.newUser.name.toUpperCase();    
  }
  checkMail(){
    if(this.newUser.email != null)
      this.newUser.email = this.newUser.email.toUpperCase();    
  }
  checkEnterprise() {
    if(this.newUser.enterprise != null)
    this.newUser.enterprise = this.newUser.enterprise.toUpperCase();    
  }




  // Validaciones -------------------------------------------------------

  validateMail(){

    this.form.email = 0;
    if(this.newUser.email != null && this.newUser.email != ''){

      for(let user of this.users){
        
        if(user.email == this.newUser.email) {
        
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

    if(this.newUser.name != null && this.newUser.name != ''){
      
            for(let user of this.users){
              
              if(user.name == this.newUser.name) {
              
                
                this.form.validate = false;
                this.form.name = 2;
      
              }
      
            }
      
          } else if(this.newUser.name == null || this.newUser.name == ''){

            this.form.validate = false;
            this.form.name = 1;
          
          }                     
  }


  validateType() {

    this.form.type = 0;

    if(this.newUser.type  == null){
    
      this.form.validate = false;
      this.form.type = 1;

    }

  }

  validatePassword() {

    this.form.password = 0;
    if(this.newUser.password  == null){
      
        this.form.validate = false;
        this.form.password = 1;
  
      }
  }


}
