import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomsAddComponent } from './rooms/rooms-add/rooms-add.component';
import { RoomsBookingComponent } from './rooms/rooms-booking/rooms-booking.component';
import { loginGuard } from './guards/login.guard';
import { roomGuard } from './rooms/guards/room.guard';
import { BookingComponent } from './booking/booking.component';
import { bookingGuard } from './booking/guards/booking.guard';
import { CommentComponent } from './comment/comment.component';
import { commentGuard } from './comment/guards/comment.guard';

//This is where we have to specify the all routes of the application.
export const routes: Routes = [
  //This is the basic routing where we have to specify the path and attach the component which will be render at that particular path.
  {
    path: 'rooms',
    component: RoomsComponent,
    canActivateChild: [roomGuard],
    children: [
      { path: 'add', component: RoomsAddComponent, canActivate: [loginGuard] },
      // {
      //   path: ':roomid',
      //   component: RoomsBookingComponent,
      //   canActivate: [loginGuard],
      // },
    ],
  }, // This is called nested routing.
  { path: 'employee', component: EmployeeComponent, canActivate: [loginGuard] },
  {path: 'booking/:roomid', component: BookingComponent, canDeactivate: [bookingGuard]},
  {path: 'comment', component:CommentComponent, resolve: {comments: commentGuard}},
  /*
  canDeactivate : If this gaured is true then we can able to move out from this page, if not we can't able to navigate/route to 
  another page.
  */
  { path: 'login', component: LoginComponent },
  //configuration of default routing whenever the user will hit the locaclhost, by default it will redirect to rooms component.
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //This is called the wildcard route, if there is an error in the url or does the page not exit
  //it will automatically route to the notfound component and display the error message.
  { path: '**', component: NotfoundComponent },
 // {path: 'booking', loadChildren: ()=> import('./booking/booking.module').then(m) => m.BookingModule }
 
  //Dynamic route wheer if pass any attribute such as id or any other variable and able to provide
  //information of that particular varibale.
];
