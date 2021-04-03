import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Customer } from 'src/app/models/customer';
import { Color } from 'src/app/models/color';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { RentalService } from 'src/app/services/rental.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  mainCar: CarDetail;
  carImages: CarImage[];
  brands: Brand[];
  colors: Color[];
  rental: Rental = {
    rentalId: 0,
    carId: 0,
    rentDate: '',
    returnDate: '',
    customerId: 0,
  };
  creditCard: CreditCard = {
    cardNo: '',
    cvv: '',
    expiringDate: '',
    id: 0,
    name: '',
    customerId: 0,
  };
  creditCards: CreditCard[];
  creditCardId: number = 0;
  selectedCard: CreditCard;
  customers: Customer[];
  dataLoaded = false;
  filterText = '';
  saveCard = false;
  filterColorId: number = 0;
  filterBrandId: number = 0;

  constructor(
    private CarService: CarService,
    private BrandService: BrandService,
    private ColorService: ColorService,
    private customerService: CustomerService,
    private RentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private creditCardService: CreditCardService,
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
      this.getCustomers();
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

  getCarImageClass(carImage:CarImage){
    if (carImage == this.carImages[0]) {
      return "carousel-item active";
    }
    return "carousel-item";
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

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  addRental(rental: Rental) {
    this.rental.carId = this.mainCar.carId;
    this.getCreditCardsByCustomerId(rental.customerId);
    this.RentalService.addRental(rental).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Kiralama eklendi.');
        this.rental.rentalId = 1;
      },
      (responseError) => {
        console.log(responseError);
        this.toastrService.error('Kiralama başarısız.');
      }
    );
  }

  totalPrice(date1: string, date2: string): number {
    var diff = Math.ceil((Date.parse(date2) - Date.parse(date1)) / 86400000);
    return diff * this.mainCar.dailyPrice;
  }


  pay() {
    this.toastrService.info("Lütfen bekleyin. Ödeme yapılıyor.");
    if (this.creditCardId != 0) {
      this.creditCardService.getById(this.creditCardId).subscribe((response) => {
          console.log(response);
          this.selectedCard = response.data;
        });
    }
    setTimeout(() => {
      this.toastrService.success("Ödeme başarılı.");
      if (this.creditCardId != 0) {
        this.creditCard = this.selectedCard;
      }
      this.creditCard.customerId = this.rental.customerId;
      this.creditCard.id = 0;
      if(this.saveCard == true){
        this.creditCardService.addCreditCard(this.creditCard).subscribe((response) => {
          this.toastrService.success('Kart kaydedildi.');
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },((responseError)=>{
          console.log(responseError);
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage);
          }
        }));
      }
    }, 3000);
  }

  getCreditCardsByCustomerId(customerId: number) {
    this.creditCardService.getByCustomerId(customerId).subscribe((response) => {
      this.creditCards = response.data;
    });
  }
  
  ifPaymentFilled(){
    if ((this.creditCard.cardNo != '' && this.creditCard.name != '' && this.creditCard.cvv != '' && this.creditCard.expiringDate != '') || this.creditCardId != 0) {
      return false;
    }
    return true;
  }

}
