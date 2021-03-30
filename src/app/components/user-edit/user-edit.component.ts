import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user:User;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.userService.getUserByEmail(localStorage.getItem("email")).subscribe((response)=>{
      this.user = response.data;
    });
  }

  update(){
    
  }

}
