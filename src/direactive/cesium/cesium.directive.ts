import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit {

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    const viewer = new Cesium.Viewer(this.el.nativeElement);
  }

}
