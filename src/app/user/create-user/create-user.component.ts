import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();  
  view: boolean = true;

  newUser: User = new User();
  userTypes: Array<any> = [{value: 1, viewValue: 'Empleado'},
                           {value: 9, viewValue: 'Administrador'},
                           {value: 10, viewValue: 'Super Administrador'},]    ;
  
  form = {validate: true, name: 0, email: 0, password: 0, type: 0};                           


  constructor(private _http: UserService) {    
   }

  ngOnInit() {
    
  }


  closePop(){
    this.close.emit(null);
    this.view = false;
  }

  formSubmit() {
    this.form.validate = true;
        
    this.validateType();
    this.validatePassword();    
    this.validateName();         
    
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

  emitNewUser(){
    if(this.form.validate == true) {
      
            this.create.emit(this.newUser);
            
            this.closePop();
    }
  }




  // Validaciones -------------------------------------------------------

  validateMail(){    

    this.form.email = 0;
    if(this.newUser.email != null && this.newUser.email != ''){

      this._http.validatUniqueEmail({ email: this.newUser.email}).then(
        data => {
          if(data == 1){
            
            this.form.validate = false;
            this.form.email = 2;
          } 
          this.emitNewUser();           
        },
        error => console.log(error)
      )
    
    } else {
      this.form.validate = false;
      this.form.email = 1;
    } 

  } //Fin de validate Mail


  validateName() {

    this.form.name = 0;

    if(this.newUser.name != null && this.newUser.name != ''){
      
      this._http.validateUniqueName({ name: this.newUser.name}).then(
        data => {

            this.validateMail();  
         
        }, error => {

          console.log(error);
          
          this.form.validate = false;
          this.form.name = 2;

          this.validateMail();  

        } 
      )                                                                          
      
    } else if(this.newUser.name == null || this.newUser.name == ''){

      this.form.validate = false;
      this.form.name = 1;

      this.validateMail();  
    
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
