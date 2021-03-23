import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { RentalResponseModel } from '../models/rentalResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44321/api/rentals/';

  constructor(private httpClient: HttpClient) {}

  getRentals():Observable<RentalResponseModel> {
    let newPath = this.apiUrl + "getdetails";
    return this.httpClient.get<RentalResponseModel>(newPath);
  }
  addRental(rental:Rental):Observable<ResponseModel> {
    let newPath = this.apiUrl + "addrental";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}
