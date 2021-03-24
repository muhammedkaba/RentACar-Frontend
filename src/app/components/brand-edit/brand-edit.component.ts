import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {
  brandEditForm: FormGroup;
  brands: Brand[];
  mainBrandId:number;

  constructor(private brandService:BrandService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.brandEditForm = this.formBuilder.group({
        brandName:["",Validators.required],
        brandId:["",Validators.required]
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) =>{
      this.brands = response.data;
    })
  }
  update() {
    if (this.brandEditForm.valid) {
      let brandModel = Object.assign({}, this.brandEditForm.value);
      this.brandService.update(brandModel).subscribe(
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
