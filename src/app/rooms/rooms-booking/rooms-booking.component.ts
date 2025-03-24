import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  imports: [CommonModule],
  templateUrl: './rooms-booking.component.html',
  styleUrl: './rooms-booking.component.scss'
})
export class RoomsBookingComponent implements OnInit {

  id:number =0;
  id$ : Observable<Number> ;
  constructor(private routerService: ActivatedRoute){
    //this.id$ = this.routerService.params.pipe(map(params =>params['roomid']));
    //Instead of using params which is an observable, if we have more than one parameters we can use paramap which is aslo an observable
    //but paramap is more preferable because it will check whether the key is available or not before retruning the value.
    this.id$ = this.routerService.paramMap.pipe(map((params) => Number(params.get('roomid'))));
  }
ngOnInit(): void {
  //Never subscribe to the service because it will cause the memory leak and also it won't unsubscribe to the service as well.
  //this.routerService.params.subscribe((params) =>{ this.id = params['roomid']})

  //snapshort creates a new instance of the service and will display it in the console but it won't update the values
  //if there is any updation within the view.
  //this.id = this.routerService.snapshot.params['roomid'];

  
}
}
