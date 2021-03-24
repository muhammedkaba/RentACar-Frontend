import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent implements OnInit {
  colorEditForm: FormGroup;
  colors: Color[];
  mainColorId:number;

  constructor(private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getColors();
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.colorEditForm = this.formBuilder.group({
        colorName:["",Validators.required],
        colorId:["",Validators.required]
    });
  }

  getColors(){
    this.colorService.getColors().subscribe((response) =>{
      this.colors = response.data;
    })
  }
  update() {
    if (this.colorEditForm.valid) {
      let colorModel = Object.assign({}, this.colorEditForm.value);
      this.colorService.update(colorModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Eklenemedi');
    }
  }
}
