import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  isAuthenticate:boolean;
  user:User;

  constructor(private authService:AuthService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.isAuthenticate = this.isAuthenticated();
    this.getUserByEmail();
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  getUserByEmail(){
    return this.userService.getUserByEmail(localStorage.getItem("email")).subscribe((response)=>{
      this.user = response.data;
    });
  }

  logOut(){
    localStorage.clear();
    window.location.reload();
  }



}
