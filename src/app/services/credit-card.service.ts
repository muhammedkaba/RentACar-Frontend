import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl = 'https://localhost:44321/api/creditcards/';

  constructor(private httpClient: HttpClient) {}

  addCreditCard(creditCard:CreditCard):Observable<ResponseModel> {
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }

  getByCustomerId(customerId:number):Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "getbycustomerid?customerId="+ customerId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getById(id:number):Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "getbyid?id=" + id;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

}
