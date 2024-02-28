import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Configuration } from 'src/app/models/Configuration';
import { Skeet } from 'src/app/models/Skeet';
import { SkeetConfig } from 'src/app/models/SkeetConfig';
import { ConfigurationService } from 'src/app/services/config.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GameType } from 'src/app/models/enums';

@Component({
  selector: 'app-normal-config',
  templateUrl: './normal-config.component.html',
  styleUrls: ['./normal-config.component.css']
})
export class NormalConfigComponent implements OnInit {

  skeetForm: FormGroup;
  public typeName: string;
  public isReady: boolean = false;
  @Input() public config: Configuration = new Configuration();
  public tempConfig: Configuration = new Configuration();
  @Input() public type: number;
  skeetOptions: Skeet[] = [];

  constructor(private configService: ConfigurationService, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.skeetOptions = await this.configService.GetAllSkeets();
    const tPlayerLevels = await this.configService.GetPlayerLevel();
    const tLevel = tPlayerLevels.find((item) => item.ID == this.type);
    this.typeName = tLevel?.Name + " - " + GameType[tLevel.GameTypeId].toString();
    this.tempConfig = this.config.config.length > 0 ? JSON.parse(this.config.config) : new Configuration();
    this.initializeForm();
    this.isReady = true;
  }

  initializeForm(): void {
    // Initialize the form with a FormArray for skeets
    this.skeetForm = new FormGroup({
      timePerShot: new FormControl(this.config.TimePerShot),
      timeToRefill: new FormControl(this.config.TimeToRefill),
      skeets: new FormArray([

      ])
    });
    if (this.tempConfig.Skeets.length > 0) {
      for (let index = 0; index < this.tempConfig.Skeets.length; index++) {
        this.addSkeet(this.tempConfig.Skeets[index]);
      }
    } else {
      this.addSkeet();
    }
  }

  public getSkeetsFeilds(pSkeet: SkeetConfig = new SkeetConfig()) {
    return new FormGroup({
      skeetID: new FormControl(pSkeet.SkeetID),
      order: new FormControl(pSkeet.Order == -1 ? this.getNextOrder() : pSkeet.Order)
    })
  }

  // Convenience getter for easy access to form array controls
  get skeetsArray(): FormArray {
    return this.skeetForm.get('skeets') as FormArray;
  }

  public addSkeet(pSkeet: SkeetConfig = new SkeetConfig()): void {
    (this.skeetForm.get('skeets') as FormArray).push(this.getSkeetsFeilds(pSkeet));
  }


  removeSkeet(index: number): void {
    // Remove the skeet control at the specified index from the FormArray
    this.skeetsArray.removeAt(index);
  }

  getTotalClays(): number {
    let tCount = 0;
    for (let index = 0; index < this.skeetForm.value.skeets.length; index++) {
      const num = this.skeetForm.value.skeets[index].skeetID.length;
      tCount += num;
    }
    return tCount;
  }


  public getNextOrder() {
    try {
      let tMaxOrder = 0;
      for (let index = 0; index < this.skeetForm.value.skeets.length; index++) {
        const tOrder = this.skeetForm.value.skeets[index].order;
        if (tOrder > tMaxOrder) {
          tMaxOrder = tOrder;
        }
      }
      return tMaxOrder + 1;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  async onSubmit(): Promise<void> {
    const tConfiguration: Configuration = new Configuration();
    tConfiguration.TimePerShot = this.skeetForm.value.timePerShot;
    tConfiguration.TimeToRefill = this.skeetForm.value.timeToRefill;
    for (let index = 0; index < this.skeetForm.value.skeets.length; index++) {
      const tSkeets = this.skeetForm.value.skeets[index].skeetID;
      const tSkeetConfig: SkeetConfig = new SkeetConfig(tSkeets);
      for (let skeetInex = 0; skeetInex < tSkeets.length; skeetInex++) {
        const element: number = tSkeets[skeetInex];
        const tItem = this.skeetOptions.find((item) => item.ID == element);
        tSkeetConfig.API.push(tItem.API);
      }
      tSkeetConfig.Order = this.skeetForm.value.skeets[index].order;
      tConfiguration.Skeets.push(tSkeetConfig);
    }
    tConfiguration.NumberOfSkeet = tConfiguration.Skeets.length;
    tConfiguration.config = JSON.stringify(tConfiguration);
    const tResult = await this.configService.UpdateConfig(this.config.ID, tConfiguration);
    if (tResult == 0) {
      this.openAlertDialog('The Settings Saved Successfully');
    } else {
      this.openAlertDialog('Faild To Save Settings');
    }
  }

  async DeleteConfig() {
    try {
      this.configService.DeleteConfig(this.config.ID, this.config.Type);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }


  openAlertDialog(pMessage: string) {
    this.dialog.open(AlertDialogComponent
      , {
        data: {
          icon: 'Error',
          message: pMessage
        }
      });
  }

}
