import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ["",Validators.required],
      lastName: ["",Validators.required]
    });
  }

  register() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let registerModel = Object.assign({}, this.loginForm.value);

      this.authService.register(registerModel).subscribe((response) => {
        this.toastrService.success("Kayıt olundu",response.message);
        localStorage.setItem("token",response.data.token);
      },responseError=>{
        this.toastrService.error(responseError.error);
      });
    }
  }
}
