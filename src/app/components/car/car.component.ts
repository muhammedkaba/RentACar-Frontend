import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarUser } from 'src/app/models/carUser';
import { Color } from 'src/app/models/color';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { BrandService } from 'src/app/services/brand.service';
import { CarUserService } from 'src/app/services/car-user.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  mainCar:CarDetail;
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
  creditCard:CreditCard = {
    cardNo: "",
    cvv: "",
    expiringDate: "",
    id:0,
    name:""
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
    private activatedRoute:ActivatedRoute,
    private creditCardService:CreditCardService,
    private toastrService:ToastrService) {}

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
    this.CarService.getDetailsByCarId(carId)
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
      this.toastrService.success("Arabalar listelendi.","Başarılı");
    }
    else if (colorId !== 0 && brandId === 0) {
      this.getCarsByColor(colorId);
      this.toastrService.success("Arabalar listelendi.","Başarılı");
    }
    else{
      this.getCarsByBrandAndColor(brandId,colorId);
      this.toastrService.success("Arabalar listelendi.","Başarılı");
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
      this.toastrService.success("Kiralandı.","İşlem Başarılı");
      this.rental.rentalId = 1;
    });
  }

  totalPrice(date1:string,date2:string):number{
    var diff =  Math.floor(( Date.parse(date2) - Date.parse(date1) ) / 86400000)
    return diff * this.mainCar.dailyPrice;
  }

  pay(creditCard:CreditCard){
    this.creditCardService.addCreditCard(creditCard).subscribe((response)=>{
      this.toastrService.success("Ödeme yapıldı.","İşlem Başarılı");
    })
  }


}
