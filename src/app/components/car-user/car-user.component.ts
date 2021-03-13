import { Component, OnInit } from '@angular/core';
import { CarUser } from 'src/app/models/carUser';
import { CarUserService } from 'src/app/services/car-user.service';

@Component({
  selector: 'app-car-user',
  templateUrl: './car-user.component.html',
  styleUrls: ['./car-user.component.css']
})
export class CarUserComponent implements OnInit {
  carUsers: CarUser[] = [];
  dataLoaded = false;
  constructor(private CarUserService: CarUserService) {}

  ngOnInit(): void {
    this.getCarUsers();
  }

  getCarUsers() {
    this.CarUserService.getCarUsers()
    .subscribe((response) => {
      this.carUsers = response.data;
      this.dataLoaded = true;
    });
  }
}
