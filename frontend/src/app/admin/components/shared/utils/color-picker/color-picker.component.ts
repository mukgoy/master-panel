import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'admin-color-picker',
  templateUrl: './color-picker.component.html'
})
export class ColorPickerComponent implements OnInit {

  @Input() colorActive = "";
  @Output() onSelect = new EventEmitter<any>() ;
  constructor() { }

  ngOnInit(): void {
  }

  colors = [
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "light",
    "dark",
  ]
  afterSelect(icon:string){
    this.onSelect.emit(icon);
  }
}
