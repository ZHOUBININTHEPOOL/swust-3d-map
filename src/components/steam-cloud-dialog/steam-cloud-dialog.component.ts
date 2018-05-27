import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SteamCloudParameter } from '../../entity';

@Component({
  selector: 'app-dialog-steam-cloud',
  templateUrl: 'steam-cloud-dialog.component.html',
  styleUrls: ['steam-cloud-dialog.component.scss']
})
export class SteamCloudDialogComponent implements OnInit {
  private opened = true;
  private formGroup: FormGroup;
  @Output() clickSubmit = new EventEmitter<SteamCloudParameter>();

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

    this.clickSubmit.emit(param);
  }
}
