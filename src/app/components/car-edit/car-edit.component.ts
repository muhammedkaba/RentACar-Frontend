import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  carAddForm: FormGroup;
  brands: Brand[];
  colors: Color[];
  mainCarDetail:CarDetail;
  mainCar:Car;
  cars:CarDetail[];
  filterText = "";
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
        this.getCarDetails(params["carId"]);
        this.getCar(params["carId"]);
      }else{
        this.getCars();
      }
      this.getBrands();
      this.getColors();
  });
  }


  update(){
    this.carService.update(this.mainCar).subscribe((response) =>{
      if (response.success) {
        this.toastrService.success("Güncellendi");
      }
    })
  }
  getColors(){
    this.colorService.getColors().subscribe((response) =>{
      this.colors = response.data;
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe((response) =>{
      this.brands = response.data;
    })
  }
  getCarDetails(carId:number) {
    this.carService.getDetailsByCarId(carId)
    .subscribe((response) => {
      this.cars = response.data;
      this.mainCarDetail = this.cars[0];
    });
  }
  getCar(carId:number) {
    this.carService.getCarById(carId)
    .subscribe((response) => {
      this.mainCar = response.data[0];
    });
  }
  getCars() {
    this.carService.getCars()
    .subscribe((response) => {
      this.cars = response.data;
    });
  }
}
