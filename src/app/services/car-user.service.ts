import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarUserResponseModel } from '../models/carUserResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarUserService {
  apiUrl = 'https://localhost:44321/api/carusers/getall';

  constructor(private httpClient: HttpClient) {}

  getCarUsers():Observable<CarUserResponseModel> {
    return this.httpClient.get<CarUserResponseModel>(this.apiUrl);
  }
}
