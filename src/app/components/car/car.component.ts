import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carImages: CarImage[];
  dataLoaded = false;
  constructor(private CarService: CarService,
    private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["colorId"]) {
        this.getCarsByColor(params["colorId"]);
      }
      else if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"]);
      }
      else if (params["carId"]) {
        this.getDetails(params["carId"]);
      }else{
        this.getCars();
      }
  });
}

  getCars() {
    this.CarService.getCars()
    .subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId:number) {
    this.CarService.getCarsByColor(colorId)
    .subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId:number) {
    this.CarService.getCarsByBrand(brandId)
    .subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getDetails(carId:number) {
    this.CarService.getByCarId(carId)
    .subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
    this.CarService.getCarImages(carId)
    .subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }

}
