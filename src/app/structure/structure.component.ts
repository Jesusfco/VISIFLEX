import { Component, OnInit } from '@angular/core';

import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';

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

      transition('initial <=> final' , animate('300ms ease-in')),
    ]),
    
    trigger('space', [
      state('initial', style({
        padding: '60px 0px 0px 250px'
      })),

      state('final' ,style({
        padding: '60px 0px 0px 0px'
      })),

      transition('initial <=> final' , animate('300ms ease-in')),
    ]),
  ]
})
export class StructureComponent implements OnInit {

  state: string = 'initial';
  
  
    constructor() {
  
    }
  
  
    sideNav(){
      this.state = (this.state === 'initial' ? 'final' : 'initial');
    }

  ngOnInit() {
  }

}
