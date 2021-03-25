import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44321/api/';

  constructor(private httpClient: HttpClient) {}


  add(car:Car):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/add";
    return this.httpClient.post<ListResponseModel<Car>>(newPath,car);
  }
  update(car:Car):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/update";
    return this.httpClient.post<ListResponseModel<Car>>(newPath,car);
  }
  getCars():Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getdetails";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarById(carId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarbyid?carId="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getdetailsbycolor?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getdetailsbybrand?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByBrandAndColor(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getdetailsbycolorandbrand?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getDetailsByCarId(carId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getdetailbyid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarImages(carId:number):Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + "carimages/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
