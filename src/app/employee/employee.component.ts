import { Component } from '@angular/core';
import { RoomsService } from '../rooms/service/rooms.service';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  providers: [RoomsService] // If we don't want to use the singleton instance and we want to create our own instance for this particular component.
})
export class EmployeeComponent {
  empName: string = 'Employee Name';

  constructor(private roomsService: RoomsService){}
}
