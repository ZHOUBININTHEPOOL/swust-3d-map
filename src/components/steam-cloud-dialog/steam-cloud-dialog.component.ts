import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SteamCloudParameter } from '../../entity';
import * as Rx from 'rxjs/';

@Component({
  selector: 'app-steam-cloud-dialog',
  templateUrl: 'steam-cloud-dialog.component.html',
  styleUrls: ['steam-cloud-dialog.component.scss']
})
export class SteamCloudDialogComponent implements OnInit {
  private opened = false;
  private formGroup: FormGroup;
  @Output() clickSubmit = new Rx.ReplaySubject<SteamCloudParameter>(1);

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
    const param: SteamCloudParameter = {
      heatOfCombustion: this.formGroup.get('heatOfCombustion').value,
      quality: this.formGroup.get('quality').value
    };

    this.clickSubmit.next(param);
    this.close();
  }
}
