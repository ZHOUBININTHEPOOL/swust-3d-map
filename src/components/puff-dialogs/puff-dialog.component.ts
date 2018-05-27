import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PuffParameter } from '../../entity';

@Component({
  selector: 'app-puff-dialog',
  templateUrl: 'puff-dialog.component.html'
})
export class PuffDialogComponent implements OnInit {
  private opened = true;
  private formGroup: FormGroup;
  @Output() clickSubmit = new EventEmitter<PuffParameter>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  public open(): void {
    this.opened = true;
  }

  private initForm(): void {
    this.formGroup = this.fb.group({
      heatOfCombustion: [0],
      quality: [0]
    });
  }

  private close(): void {
    this.opened = false;
  }

  private submit(): void {
    const param: PuffParameter = {
    };

    this.clickSubmit.emit(param);
  }
}
