import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { AppNavComponent } from "./app-nav/app-nav.component";
import { FormsModule } from '@angular/forms';
import { RoomsRoutingModule } from './rooms/rooms-routing.module';

@Component({
  selector: 'app-root',
  imports: [CommonModule, AppNavComponent, FormsModule, RoomsRoutingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';

  //role = 'admin';
  @ViewChild('name', { static: true }) name!: ElementRef;
  constructor(@Optional() private loggerService: LoggerService) {

  }
  ngOnInit(): void {
    this.loggerService?.log('Appcomponent.ngOnInit()');
    //this.name.nativeElement.innerText = "La Quinta"; -- causing error
  }


  /*
  The template reference is used to manipulate the DOM elements such as html tags We can able to modify even the input,
  By using the viewchild we are accessng the template reference which will provide the access to ng-template and later 
  we havre created an instance of the roomscomponent, whcih is possible by the ViewcontainerRef.
  */

  // @ViewChild('tester',{read : ViewContainerRef}) vcr!: ViewContainerRef;

  // ngAfterViewInit(): void {
  //     const componentRef= this.vcr.createComponent(RoomsComponent);

  //     componentRef.instance.noOfRooms = 50;
  // }

}
