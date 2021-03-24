import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { BrandResponseModel } from '../models/brandResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = 'https://localhost:44321/api/brands/';

  constructor(private httpClient: HttpClient) {}

  getBrands():Observable<BrandResponseModel> {
    let newPath = this.apiUrl + "getall";
    return this.httpClient.get<BrandResponseModel>(newPath);
  }

  add(brand:Brand):Observable<ResponseModel> {
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  update(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
}
