import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PlumeParameter } from '../../entity';
import * as Rx from 'rxjs/';

@Component({
  selector: 'app-plume-dialog',
  templateUrl: 'plume-dialog.component.html'
})
export class PlumeDialogComponent implements OnInit {
  private opened = false;
  private formGroup: FormGroup;
  @Output() clickSubmit = new Rx.ReplaySubject<PlumeParameter>(1);
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  public open(): void {
    this.opened = true;
  }

  private initForm(): void {
    this.formGroup = this.fb.group({
      windSpeed: [0],
      sourceIntensity: [0],
      concentration: [0],
      windAngle: [0]
    });
  }

  private close(): void {
    this.opened = false;
  }

  private submit(): void {
    const param: PlumeParameter = {
      windSpeed: this.formGroup.get('windSpeed').value,
      sourceIntensity: this.formGroup.get('sourceIntensity').value,
      concentration: this.formGroup.get('concentration').value,
      windAngle: this.formGroup.get('windAngle').value
    };

    this.clickSubmit.next(param);
  }
}
