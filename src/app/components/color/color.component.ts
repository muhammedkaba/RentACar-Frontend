import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  dataLoaded = false;
  currentColor: Color;
  emptyColor: Color;
  constructor(private ColorService: ColorService) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.ColorService.getColors()
    .subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }
    setCurrentColor(Color: Color) {
    this.currentColor = Color;
  }
  getCurrentColorClass(Color: Color) {
    if (Color == this.currentColor) {
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  getAllColorClass(){
    if (!this.currentColor) {
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
  removeCurrentColor(){
    this.currentColor = this.emptyColor;
  }
}
