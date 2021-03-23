import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarUser } from 'src/app/models/carUser';
import { Color } from 'src/app/models/color';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { ResponseModel } from 'src/app/models/responseModel';
import { BrandService } from 'src/app/services/brand.service';
import { CarUserService } from 'src/app/services/car-user.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  mainCar:Car;
  carImages: CarImage[];
  brands:Brand[];
  colors:Color[];
  rental:Rental = {
    rentalId: 0,
    carId: 0,
    rentDate: "",
    returnDate: "",
    userId : 0
  };
  carUsers:CarUser[];
  dataLoaded = false;
  filterText="";
  filterColorId:number = 0;
  filterBrandId:number = 0;

  constructor(private CarService: CarService,
    private BrandService:BrandService,
    private ColorService:ColorService,
    private CarUserService:CarUserService,
    private RentalService:RentalService,
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
      this.getBrands();
      this.getColors();
      this.getCarUsers();
  });
}

  getCars() {
    this.CarService.getCars()
    .subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getColors(){
    this.ColorService.getColors()
    .subscribe((response) => {
      this.colors = response.data;
    });
  }

  getBrands(){
    this.BrandService.getBrands()
    .subscribe((response) => {
      this.brands = response.data;
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
      this.mainCar = this.cars[0];
      this.dataLoaded = true;
    });
    this.CarService.getCarImages(carId)
    .subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrandAndColor(brandId:number,colorId:number) {
    this.CarService.getCarsByBrandAndColor(brandId,colorId)
    .subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByFilter(brandId:number, colorId:number){
    if (brandId === 0 && colorId === 0) {
    }
    else if (brandId !== 0 && colorId === 0) {
      this.getCarsByBrand(brandId);
    }
    else if (colorId !== 0 && brandId === 0) {
      this.getCarsByColor(colorId);
    }
    else{
      this.getCarsByBrandAndColor(brandId,colorId);
    }
  }

  getCarUsers() {
    this.CarUserService.getCarUsers()
    .subscribe((response) => {
      this.carUsers = response.data;
    });
  }

  addRental(rental:Rental){
    rental.carId = this.mainCar.carId;
    this.RentalService.addRental(rental).subscribe((response)=>{
      console.log(response.success);
    });
  }

}
