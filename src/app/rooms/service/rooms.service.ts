import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../room';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { localStorageToken } from '../../localstorage.token';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root' // This is used to include in root component, so that if we are using the service it will be bundled into code, 
  // if not then it will delete the service.
})
export class RoomsService {
  roomList : RoomList[]= [];

  //This is shareReplay used to cache the data and we have to use it before subscribe the stream
  //The $ is used to denote the streams by creating pipes we can able to use the shareReplay only after the 
  //http is got initialised. 
  getRooms$ : Observable<RoomList[]>;

  headers = new HttpHeaders({token : '3516513513832'});

  constructor(@Inject(APP_SERVICE_CONFIG) private config:AppConfig, 
private http : HttpClient) { 
    console.log(this.config.apiEndpoint);

    this. getRooms$ = this.http.get<RoomList[]>('/api/rooms', {headers: this.headers,}).pipe(
      shareReplay(1)
    );
  }

  


  getRooms(){
    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRoom(room: RoomList){
    return this.http.post<RoomList[]>('/api/rooms',room);
  }

  editRoom(room:RoomList){
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`,room);
  }
  deleteRoom(id:string){
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  //Request method use case
  getPhotos(){
    const request = new HttpRequest('GET',`https://jsonplaceholder.typicode.com/photos`,{
      reportProgress:true,
    });
    return this.http.request(request);
  }
}

