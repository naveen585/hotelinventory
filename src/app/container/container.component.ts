import { AfterContentChecked, AfterContentInit, Component, ContentChild, Host, OnDestroy, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/service/rooms.service';

@Component({
  selector: 'app-container',
  imports: [],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  providers: [RoomsService]
})
export class ContainerComponent implements OnInit,AfterContentInit{

  @ContentChild(EmployeeComponent) employee !: EmployeeComponent;

  constructor(@Host() private roomsService: RoomsService){

  }

  ngOnInit(): void {
      
  }

  ngAfterContentInit(): void {
    console.log(this.employee);
    this.employee.empName ='John Wick';
      
  }

}
