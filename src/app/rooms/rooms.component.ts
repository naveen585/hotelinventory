import { AfterViewInit, Component, DoCheck, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './room';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from "./rooms-list/rooms-list.component";
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './service/rooms.service';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  imports: [CommonModule, RoomsListComponent, RouterOutlet, ReactiveFormsModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit {
  hotelName = 'La Quinta';
  noOfRooms = 10;
  hideRooms = true;

  title ='Rooms List';

  selectedRoom!: RoomList;
  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Room List';
  }

  selectRoom(room: RoomList){
    this.selectedRoom = room;
  }

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  //If we have a list of same component whcih is used to display the content in a list, we will use the 
  // viewchildren tag and querylist to make it as a list.
  @ViewChildren(HeaderComponent) headerComponentChildren!: QueryList<HeaderComponent>;





  room: Room = {
    totalRooms: 10,
    availableRooms: 10,
    bookedRooms: 5
  }

  roomList: RoomList[] = [];
  total:number=0;
  uploadBytes: number =0;

  /*
  //Createion of Observables manually
  stream = new Observable<string>((observer)=>{
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  })

  Inside the observable the functionality works as mentioned below and also the observer will also have the smae implemention as mentioned below.
  It is like a loop.
    */

  //Using Async pipe: It is used to subscribe and unsubscribe the service without mentioning it explicitly, it will automatically destroys the 
  //service, it will also able to wrap and get the data, also we can able cache the async pipe as well instead of creating multiple times
  //it will cache it and we can use that.
  rooms$ : Observable<RoomList[]>;

  error$ = new Subject<string>;

  getError$ = this.error$.asObservable();

  roomCount$ : Observable<number>;

  priceFilter = new FormControl(0);


  constructor(private roomService: RoomsService, private routerService : Router) {
    this.rooms$ = this.roomService.getRooms$.pipe(catchError((error) =>{
      this.error$.next(error.message);
      return of([]);
    }));
    this.roomCount$ = this.roomService.getRooms$.pipe(
      map((rooms) => rooms.length)
       );

   } // If we don't provide the constructor, it will be automatically created by TypeScript it self.


  ngOnInit(): void {
    //console.log(this.headerComponent); -- If we don't provide static as true in view child it will provide value as undefined
    //because we are trying to use the header component before its initialisation.

  /*
  This was used for the observables which was created manually without using the http request. 
  This is the internal implementation of observable where it has next it will check for the new value and the values present in the stream
  complete which means the data in the stream has completed
  error whcih will throws error and provides the information.
    this.stream.subscribe({
    next:(value) => console.log(value),
    complete: () => console.log('complete'),
    error:(error) => console.log(error),
  }); 
  */

  //The request api will provides more information than the reqular http get method where you can see below.
  // this.roomService.getPhotos().subscribe((event)=>{
  //   switch (event.type) {
  //     case HttpEventType.Sent:{
  //       console.log('Rquest has been made');
  //       break;
  //     }
  //     case HttpEventType.ResponseHeader:{
  //       console.log('Request Success');
  //       break;
  //     }
  //     case HttpEventType.DownloadProgress:{
  //       this.total +=event.loaded;
  //       break;
  //     }
  //     case HttpEventType.Response:{
  //       console.log(event.body);
  //       break;
  //     }
  //     case HttpEventType.UploadProgress:{
  //       this.uploadBytes += event.loaded;
  //       break;
  //     }
  //   }
  // });


  // Using the sharereplay 
  //this.roomService.getRooms$.subscribe()..insteaad of calling the api, we are calling the cached data.
    // this.roomService.getRooms().subscribe(rooms =>{
    //   this.roomList = rooms
    // });


    //this.routerService.events.subscribe((event)=> console.log(event)); -- to check all the router events.


  }

ngAfterViewInit(): void {
    
}

// ngAfterViewChecked(): void {
//   this.headerComponent.title = 'Welcome to Lq Quinta';

//   //We have various functionalities and functions that we can work with the last is the last component tag or element and first is the intital element,
//   //We can able to access the elements by using get function with the help of index and dirty which means there are no changes. Like these we have various
//   //functionalities, use case if we want to use the same component as list.
//   //this.headerComponentChildren.last.title =' Last of the hotel list.'
// }

ngDoCheck(): void {
    //console.log('on changes is called');
}


addRoom(){
  const room: RoomList = {
    //roomNumber: '104',
      roomType: 'Single Room',
      amenities: 'AC, TV, WiFi',
      price: 100,
      photos: 'https://via.placeholder.com/150',
      checkinTime: new Date('2023-10-01T14:00:00'),
      CheckoutTime: new Date('2023-10-02T11:00:00')
  };
  this.roomService.addRoom(room).subscribe((data)=>{
    this.roomList = data;
  });
  //this.roomList.push(room); // This will be correct if we are using the change detection default;
  
  // If we are using the on push change detection then the object has to be immutable and there won't be having any changes on that particuar file,
  // It has to access or get the values from it parent component only.
  // mostly the onpush is used for state management or ngrx
  //they will always return the new objects only.

  //this.roomList = [...this.roomList,room]; 
  //This is called spread operator, the [] will return the new onject and the spread operator will add all the previous values and by comma
  //seperated we can able to add the new value and return it as new object.


}

editRoom(){
  const room: RoomList = {
    roomNumber: '3',
      roomType: 'Single Room',
      amenities: 'AC, TV, WiFi',
      price: 100,
      photos: 'https://via.placeholder.com/150',
      checkinTime: new Date('2023-10-01T14:00:00'),
      CheckoutTime: new Date('2023-10-02T11:00:00')
  };
  this.roomService.editRoom(room).subscribe((data)=>{
    this.roomList = data;
  });
}

deleteRoom(){
  this.roomService.deleteRoom('3').subscribe((data) =>{
    this.roomList = data;
  })
}

}


//Pull Architecture (JS)
// getData from the atream -> added new data to the stream -> getData if the data has been updated then we have to call the getData again to get the
//new data.

//Push Architecture (RxJS)
//getData-> continous stream of data -> addData (once we have subscribed for the stream then it will keep on continuing the data stream,
// even if we have added new data it will automatically stream the new data to user, we don't have to call the getData again).
