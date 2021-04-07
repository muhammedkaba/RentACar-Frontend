import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carImages:CarImage[];
  mainCar:CarDetail;
  customers: Customer[];
  saveCard = false;
  creditCards: CreditCard[];
  creditCardId: number = 0;
  selectedCard: CreditCard;
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

  constructor(private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private creditCardService: CreditCardService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
      }
      this.getCustomers();
    });
  }

  getCarDetails(carId: number) {
    this.carService.getDetailsByCarId(carId).subscribe((response) => {
      this.mainCar = response.data[0];
    });
    this.carService.getCarImages(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

    getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  addRental(rental: Rental) {
    this.rental.carId = this.mainCar.carId;
    this.getCreditCardsByCustomerId(rental.customerId);
    this.rentalService.addRental(rental).subscribe(
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
        },((responseError)=>{
          console.log(responseError);
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage);
          }
        }));
      }
    }, 3000);
    setTimeout(() => {
      window.location.reload();
    }, 4500);
  }

  getCreditCardsByCustomerId(customerId: number) {
    this.creditCardService.getByCustomerId(customerId).subscribe((response) => {
      this.creditCards = response.data;
    });
  }

  ifPaymentFilled(){
    if ((this.creditCard.cardNo != '' && this.creditCard.name != '' &&
     this.creditCard.cvv != '' && this.creditCard.expiringDate != '') || this.creditCardId != 0) {
      return false;
    }
    return true;
  }

  getCarImageClass(carImage:CarImage){
    if (carImage == this.carImages[0]) {
      return "carousel-item active";
    }
    return "carousel-item";
  }

}
