import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44321/api/';

  constructor(private httpClient: HttpClient) {}

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getdetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getdetailsbycolor?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getdetailsbybrand?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrandAndColor(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getdetailsbycolorandbrand?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getByCarId(carId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getbyid?carId="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarImages(carId:number):Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + "carimages/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
