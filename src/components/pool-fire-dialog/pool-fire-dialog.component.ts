import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoolFireParameter } from '../../entity';
import * as Rx from 'rxjs/';

@Component({
  selector: 'app-pool-fire-dialog',
  templateUrl: 'pool-fire-dialog.component.html',
  styleUrls: ['pool-fire-dialog.component.scss']
})
export class PoolFireDialogComponent implements OnInit {
  private opened = false;
  private formGroup: FormGroup;
  @Output() clickSubmit = new Rx.ReplaySubject<PoolFireParameter>(1);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  public open(): void {
    this.opened = true;
  }

  private initForm(): void {
    this.formGroup = this.fb.group({
      combustionHeat: [0],
      cp: [0],
      tb: [0],
      to: [0],
      vaporizationHeat: [0],
      poolRadius: [0],
      airDensity: [0]
    });
  }

  private close(): void {
    this.opened = false;
  }

  private submit(): void {
    const param: PoolFireParameter = {
      combustionHeat: this.formGroup.get('combustionHeat').value,
      cp: this.formGroup.get('cp').value,
      tb: this.formGroup.get('tb').value,
      to: this.formGroup.get('to').value,
      vaporizationHeat: this.formGroup.get('vaporizationHeat').value,
      poolRadius: this.formGroup.get('poolRadius').value,
      airDensity: this.formGroup.get('airDensity').value
    };

    this.clickSubmit.next(param);
    this.close();
  }
}
