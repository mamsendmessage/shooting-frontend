import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SkeetConfig } from 'src/app/models/SkeetConfig';
import { Configuration } from 'src/app/models/Configuration';
import { Skeet } from 'src/app/models/Skeet';
import { ConfigurationService } from 'src/app/services/config.service';
import { CompetitionConfiguration } from 'src/app/models/CompetitionConfiguration';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-skeet-conffig',
  templateUrl: './skeet-conffig.component.html',
  styleUrls: ['./skeet-conffig.component.css']
})
export class SkeetConffigComponent implements OnInit {

  skeetForm: FormGroup;
  public typeName: string;
  public isReady: boolean = false;
  @Input() public config: Configuration = new Configuration();
  public tempConfig: CompetitionConfiguration = new CompetitionConfiguration();
  @Input() public type: number;
  skeetOptions: Skeet[] = [];
  public numbers: number[];


  //new 
  public configs: Configuration[] = [];

  constructor(private configService: ConfigurationService, private fb: FormBuilder, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    const tConfig1: Configuration = new Configuration();
    const tConfig2: Configuration = new Configuration();
    const tConfig3: Configuration = new Configuration();
    const tConfig4: Configuration = new Configuration();
    const tConfig5: Configuration = new Configuration();
    this.configs = [tConfig1, tConfig2, tConfig3, tConfig4, tConfig5]
    this.skeetOptions = await this.configService.GetAllSkeets();
    this.tempConfig = this.config.config.length > 0 ? JSON.parse(this.config.config) : new Configuration();
    this.BuildForm();
    this.isReady = true;
  }


  public BuildForm() {
    try {
      this.skeetForm = this.fb.group({
        timePerShot: this.fb.control([this.config.TimePerShot]),
        timeToRefill: this.fb.control([this.config.TimeToRefill]),
        configurations: this.fb.array([])
      });
      for (let index = 0; index < this.tempConfig.Configurations.length; index++) {
        this.addConfigurations();
        for (let skeetIndex = 0; skeetIndex < this.tempConfig.Configurations[index].Skeets.length; skeetIndex++) {
          const element = this.tempConfig.Configurations[index].Skeets[skeetIndex];
          this.addConfigurationSkeets(index, element)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  configurations(): FormArray {
    return this.skeetForm.get('configurations') as FormArray;
  }

  newConfigurations(): FormGroup {
    return this.fb.group({
      skeets: this.fb.array([])
    });
  }


  addConfigurations() {
    this.configurations().push(this.newConfigurations());
  }

  removeConfigurations(pIndex: number) {
    this.configurations().removeAt(pIndex);
  }


  configurationSkeets(pIndex: number): FormArray {
    return this.configurations()
      .at(pIndex)
      .get('skeets') as FormArray;
  }

  newSkeet(pSkeetConfig: SkeetConfig = new SkeetConfig()): FormGroup {
    return this.fb.group({
      SkeetID: this.fb.control(pSkeetConfig.SkeetID),
    });
  }

  addConfigurationSkeets(empIndex: number, pSkeetConfig: SkeetConfig = new SkeetConfig()) {
    this.configurationSkeets(empIndex).push(this.newSkeet(pSkeetConfig));
  }

  removConfigurationSkeets(pIndex1: number, pIndex2: number) {
    this.configurationSkeets(pIndex1).removeAt(pIndex2);
  }

  async onSubmit(): Promise<void> {
    const tConfiguration: Configuration = new Configuration();
    const tTimePerShot = this.skeetForm.get('timePerShot').value;
    const tTimeToRefill = this.skeetForm.get('timeToRefill').value;
    const tCompetitionConfiguration: CompetitionConfiguration = new CompetitionConfiguration();
    tConfiguration.Type = 4;
    tConfiguration.TimePerShot = tTimePerShot;
    tConfiguration.TimeToRefill = tTimeToRefill;
    for (let index = 0; index < this.configs.length; index++) {
      const tempConfiguration: Configuration = this.configs[index];
      const tSkeets: FormArray = this.configurationSkeets(index);
      for (let index2 = 0; index2 < tSkeets.length; index2++) {
        const tSkeet = tSkeets.at(index2).get('SkeetID').value;
        const tSkeetConfig: SkeetConfig = new SkeetConfig(tSkeet)
        tempConfiguration.Skeets.push(tSkeetConfig);
      }
      tempConfiguration.NumberOfSkeet = tSkeets.length;
      tCompetitionConfiguration.Configurations.push(tempConfiguration);
    }
    tConfiguration.config = JSON.stringify(tCompetitionConfiguration);
    const tResult = await this.configService.UpdateConfig(4, tConfiguration);
    if (tResult == 0) {
      this.openAlertDialog('The Settings Saved Successfully');
    } else {
      this.openAlertDialog('Faild To Save Settings');
    }

    console.log(this.skeetForm.value)
  }

  getTotalClays(): number {
    let tCount = 0;
    if (this.tempConfig.Configurations) {
      for (let index = 0; index < this.tempConfig.Configurations.length; index++) {
        for (let pIndex2 = 0; pIndex2 < this.configurationSkeets(index).length; pIndex2++) {
          const tSkeet = this.configurationSkeets(index).value[pIndex2];
          const num = tSkeet.SkeetID ? tSkeet.SkeetID.length : 0;
          tCount += num;
        }

      }
    }
    return tCount;
  }

  getOneConfigClays(pIndex: number): number {
    let tCount = 0;
    if (this.tempConfig.Configurations) {
      for (let tIndex = 0; tIndex < this.configurationSkeets(pIndex).length; tIndex++) {
        const tSkeet = this.configurationSkeets(pIndex).value[tIndex];
        const num = tSkeet.SkeetID ? tSkeet.SkeetID.length : 0;
        tCount += num;
      }
    }
    return tCount;
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
