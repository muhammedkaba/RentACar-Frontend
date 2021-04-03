import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = 'https://localhost:44321/api/users/';

  
  getUserByEmail(email:string):Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl+"getuserbyemail?email="+email);
  }
  update(registerModel:RegisterModel):Observable<SingleResponseModel<User>>{
    return this.httpClient.post<SingleResponseModel<User>>(this.apiUrl+"update",registerModel);
  }

}
