import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ColorResponseModel } from '../models/colorResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'https://localhost:44321/api/colors/';

  constructor(private httpClient: HttpClient) {}

  getColors():Observable<ColorResponseModel> {
    let newPath = this.apiUrl +"getall";
    return this.httpClient.get<ColorResponseModel>(newPath);
  }

  add(color:Color):Observable<ResponseModel> {
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

  update(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
}
