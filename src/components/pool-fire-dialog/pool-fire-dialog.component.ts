import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoolFireParameter } from '../../entity';

@Component({
  selector: 'app-pool-fire-dialog',
  templateUrl: 'pool-fire-dialog.component.html',
  styleUrls: ['pool-dialog-dialog.component.scss']
})
export class PoolFireDialogComponent implements OnInit {
  private opened = true;
  private formGroup: FormGroup;
  @Output() clickSubmit = new EventEmitter<PoolFireParameter>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }


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
    const param: PoolFireParameter = {
    };

    this.clickSubmit.emit(param);
  }
}
