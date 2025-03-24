import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../room';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FilterPipe } from "../filter.pipe";

@Component({
  selector: 'app-rooms-list',
  imports: [CommonModule, RouterLink, FilterPipe],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
    // If we are using the on push change detection then the object has to be immutable and there won't be having any changes on that particuar file,
  // It has to access or get the values from it parent component only.
  // mostly the onpush is used for state management or ngrx
  //they will always return the new objects only.
})
export class RoomsListComponent implements OnInit, OnChanges{
  
  //The Input decorator which is used to get the input data from the binding and it will then used this to show the information.
  //This is also called as parent, child communication.
  //It is also called as smart component (room component which will pass the list and renders the input) 
  //and dumb component ( whcih is room-list because it will just display the list) 
 
  @Input() rooms: RoomList[] | null= [];
  @Input() title: string = '';

  @Input() price: number | null = 0;

  @Output() selectedRoom = new EventEmitter<RoomList>();


  constructor(){}
  ngOnInit(): void {}

  selectRoom(room : RoomList){
    this.selectedRoom.emit(room);
  }
  ngOnChanges(changes: SimpleChanges): void {
      //console.log(changes);
      if(changes['title']){
        this.title = changes['title'].currentValue.toUpperCase();
      }
  }
}
