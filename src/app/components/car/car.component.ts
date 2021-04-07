import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Customer } from 'src/app/models/customer';
import { Color } from 'src/app/models/color';
import { CreditCard } from 'src/app/models/creditCard';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  mainCar: CarDetail;
  carImages: CarImage[];
  carImagePath: string;
  brands: Brand[];
  colors: Color[];
  dataLoaded = false;
  filterText = '';
  filterColorId: number = 0;
  filterBrandId: number = 0;

  constructor(
    private CarService: CarService,
    private BrandService: BrandService,
    private ColorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['carId']) {
        this.getDetails(params['carId']);
      } else {
        this.getCars();
      }
      this.getBrands();
      this.getColors();
    });
  }

  getCars() {
    this.CarService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getColors() {
    this.ColorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getBrands() {
    this.BrandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getCarsByColor(colorId: number) {
    this.CarService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId: number) {
    this.CarService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getDetails(carId: number) {
    this.CarService.getDetailsByCarId(carId).subscribe((response) => {
      this.cars = response.data;
      this.mainCar = this.cars[0];
      this.dataLoaded = true;
    });
    this.CarService.getCarImages(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }


  getCarsByBrandAndColor(brandId: number, colorId: number) {
    this.CarService.getCarsByBrandAndColor(brandId, colorId).subscribe(
      (response) => {
        this.cars = response.data;
        this.dataLoaded = true;
      }
    );
  }

  getCarsByFilter(brandId: number, colorId: number) {
    if (brandId == 0 && colorId == 0) {
      this.getCars();
      this.toastrService.success('Tüm arabalar listelendi.', 'Başarılı');
    } else if (brandId != 0 && colorId == 0) {
      this.getCarsByBrand(brandId);
      this.toastrService.success('Arabalar markaya göre listelendi.', 'Başarılı');
    } else if (colorId != 0 && brandId == 0) {
      this.getCarsByColor(colorId);
      this.toastrService.success('Arabalar renge göre listelendi.', 'Başarılı');
    } else {
      this.getCarsByBrandAndColor(brandId, colorId);
      this.toastrService.success('Arabalar marka ve renge göre listelendi.', 'Başarılı');
    }
  }

}
