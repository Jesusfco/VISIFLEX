import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';

import { Task } from '../task/task';
import { User } from '../user/user';
import { Storage } from '../storage';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css'],
  animations: [
    trigger('menu', [
      state('initial', style({
        transform: 'translate3d(0,0,0)',
        visibility: 'visible'
      })),

      state('final' ,style({
        transform: 'translate3d(-100%,0,0)',
        visibility: 'hidden'
      })),

      transition('initial <=> final' , animate('200ms ease-out')),
    ]),
    
    trigger('space', [
      state('initial', style({
        padding: '60px 0px 0px 250px'
      })),

      state('final' ,style({
        padding: '60px 0px 0px 0px'
      })),

      transition('initial <=> final' , animate('200ms ease-out')),
    ]),
  ]
})
export class StructureComponent implements OnInit {

  @Output() closeSession= new EventEmitter();  


  view = {
    user: true,
    task: false,
    assignament: false
  }

  userData = new Storage();

  userView:boolean = true;
  

  stateMenu: string;
  statePanel: string;
  
  
    constructor() {
      
    }
  
  
    sideNav(){
      if(window.screen.width < 750){
        this.stateMenu = (this.stateMenu === 'initial' ? 'final' : 'initial');
        // this.statePanel = (this.statePanel === 'initial' ? 'final' : 'initial');

      } else {
        this.stateMenu = (this.stateMenu === 'initial' ? 'final' : 'initial');
        this.statePanel = (this.statePanel === 'initial' ? 'final' : 'initial');
      }

      
    }

  ngOnInit() {
    if(window.screen.width < 750){
      this.stateMenu = "final";
      this.statePanel = 'final';
    } else {
      this.stateMenu = "initial";
      this.statePanel = 'initial';
    }

    if(this.userData.userType == 1) {
      this.view.user = false;
      this.view.task = false;
      this.view.assignament= true;
    } 
    else if(this.userData.userType == 9){
      this.view.user = true;
      this.view.task = false;
      this.view.assignament= false;
    }

    else if(this.userData.userType == 10){
      this.view.user = false;
      this.view.task = true;
      this.view.assignament= false;
    }
  }



  usuariosList(){
    this.userView = true;
  }

  cerrarSesion(){
    localStorage.clear();
    location.reload();
    // this.cerrarSesion.emit();
  }

  viewTareas(){
    this.view.task = true;
    this.view.user = false;
    this.view.assignament = false;
    this.closeNavMov();
  }
  viewUser(){
    this.view.task = false;
    this.view.user = true;
    this.view.assignament = false;
    this.closeNavMov();
  }
  viewAssignament(){
    this.view.task = false;
    this.view.user = false;
    this.view.assignament = true;
    this.closeNavMov();
  }

  closeNavMov(){
    if(window.screen.width < 750){
      this.stateMenu = "final";
      // this.statePanel = (this.statePanel === 'initial' ? 'final' : 'initial');

    } 
  }


}
