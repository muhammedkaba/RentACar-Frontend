import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { User } from 'src/app/models/user';
import { UserUpdateModel } from 'src/app/models/userUptadeModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user:User = {
    firstName : "",
    lastName : "",
    email : ""
  };
  userCheckModel:LoginModel = {
    email:"",
    password:""
  };
  userToUpdate:UserUpdateModel = {
    email:"",
    firstName:"",
    lastName:"",
    password:"",
    oldEmail:""
};
  check:boolean;

  constructor(private userService:UserService,
    private authService:AuthService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.userService.getUserByEmail(localStorage.getItem("email")).subscribe((response)=>{
      this.user = response.data;
    });
  }

  update(){
    this.userToUpdate.firstName = this.user.firstName;
    this.userToUpdate.email = this.user.email;
    this.userToUpdate.lastName = this.user.lastName;
    this.userToUpdate.oldEmail = localStorage.getItem("email");
    this.userService.update(this.userToUpdate).subscribe((response)=>{
    this.toastrService.info("Güncellendi.");
    })

  }

  checkUser(){
    this.userCheckModel.email = localStorage.getItem("email");
    this.authService.login(this.userCheckModel).subscribe((response)=>{
      this.update();
      localStorage.setItem("email",this.userToUpdate.email);
    },((responseError)=>{
      this.toastrService.error("Bilgiler eşleşmiyor.");
    }))
  }

}
