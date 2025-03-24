import { Component } from '@angular/core';
import { RoomList } from '../room';
import { FormsModule, NgForm } from '@angular/forms';
import { RoomsService } from '../service/rooms.service';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-rooms-add',
  imports: [FormsModule, CommonModule],
  templateUrl: './rooms-add.component.html',
  styleUrl: './rooms-add.component.scss'
})
export class RoomsAddComponent {
  constructor(private roomsService: RoomsService){}

  room: RoomList={
    roomType:'',
    amenities:'',
    price:0,
    photos:'',
    checkinTime: new Date(),
    CheckoutTime: new Date(),
  };
  sucessMessage :string ='';

  AddRoom(roomsForm : NgForm){ 
    this.roomsService.addRoom(this.room).subscribe((data) => {
      this.sucessMessage = 'Room Added Successfully!'
      roomsForm.reset();
    });
  }
}
