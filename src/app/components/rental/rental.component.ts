import { Component, OnInit } from '@angular/core';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentalDetails: RentalDetail[] = [];
  dataLoaded = false;
  constructor(private RentalService: RentalService) {}

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals() {
    this.RentalService.getRentals()
    .subscribe((response) => {
      this.rentalDetails = response.data;
      this.dataLoaded = true;
    });
  }
}
