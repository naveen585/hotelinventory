import { Component, OnInit, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookingService } from './booking.service';
import {MatDialogModule} from '@angular/material/dialog';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  readonly panelOpenState = signal(false);

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private configService: ConfigService,
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute,
   private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const roomId  = this.route.snapshot.paramMap.get('roomid');
    this.bookingForm = this.formBuilder.group({
      roomId: new FormControl(
        { value: roomId, disabled: true },
        { validators: [Validators.required] }
      ),
      guestEmail: ['', [Validators.required, Validators.email]],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [''],
      guestName: ['', [Validators.required, Validators.minLength(5),CustomValidator.validateName, CustomValidator.validateSpecialChar('!')]],
      address: this.formBuilder.group({
        addressLine1: ['', [Validators.required]],
        addressLine2: ['', [Validators.required]],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      guests: this.formBuilder.array([this.addGuestControl()]),
      tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
    },
    {
      updateOn:'blur', validators : CustomValidator.validatedate
    }
    //This is used to get the details once we have moved out of the field, then only we will get the changes.
    //It won't get updated or provide the data for each and every key is pressed, only once we moved from that field.
    // This functionality is also applicable for the template driven forms and also it has three types:
    //change: It is the default one, it will be called for each and every key is pressed.
    //blur: It will be called only once we moved from that particular field.
    //submit: It will provide all the changes once we clicked on submit button even the errors as well.
  );

    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe((data) => {})
    // }); -- If we want to check the valuechanges from the service method we have to use this but this is not a good practice.

    // this.bookingForm.valueChanges.pipe(
    //   mergeMap((data) => this.bookingService.bookRoom(data))
    // ).subscribe((data) => console.log(data));
    /*
    RxJs Map operators:
    mergeMap: irrespective of the sequence the mergemap will automatically stream the data once if even one change has been made in the form.
    switchMap: It will always try to provide the fresh data. Lets say I have typed in any field in the form it will provide the data and if i
              cleared the provided data in the form and it will also cancels the request provided previously and will send the new request of data.
    exhaustMap: It will only provide the data once the previous request is completed successfully. If we filled any particular field in the form,
                and satisfied the vaidation of that particular field then only the request will be made for the subscribed data and it will pass the 
                entered data on the next request only. Which means it will pass or make new request only once the previous data/request was completed 
                successfully.


    */


    //this.bookingForm.valueChanges.subscribe((data) => console.log(data));
    //This is used to listen all the data changes in realtime. For each and every value, it is like listening stream
    //where it will listen for chnages and will provide those changes.
  }

  addBooking() {
   console.log(this.bookingForm.getRawValue());
   //this.bookingService.bookRoom(this.bookingForm.getRawValue().subscribe((data: any) => console.log(data)));
    this.bookingForm.reset({
      roomId: 2,
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    }
  );
  }

  getBookingData() {
    this.bookingForm.patchValue({
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('10/2/2025'),
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  addGuest() {
    this.guests.push(this.addGuestControl());
  }

  addGuestControl() {
    return this.formBuilder.group({
      guestName: new FormControl('', { validators: [Validators.required] }),
      age: new FormControl(''),
    });
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }

  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}

export class Booking {
  roomId!: string;
  guestEmail!: string;
  checkinDate!: Date;
  checkoutDate!: Date;
  bookingStatus!: string;
  bookingAmount!: number;
  bookingDate!: Date;
  mobileNumber!: string;
  guestName!: string;
  guestAddress!: string;
  guestCity!: string;
  guestState!: string;
  guestCountry!: string;
  guestZipCode!: string;
  guestCount!: number;
  //guestList!: Guest[];
}
