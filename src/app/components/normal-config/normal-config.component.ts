import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Configuration } from 'src/app/models/Configuration';
import { Skeet } from 'src/app/models/Skeet';
import { SkeetConfig } from 'src/app/models/SkeetConfig';
import { ConfigurationService } from 'src/app/services/config.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PlayerGameType } from 'src/app/models/enums';

@Component({
  selector: 'app-normal-config',
  templateUrl: './normal-config.component.html',
  styleUrls: ['./normal-config.component.css']
})
export class NormalConfigComponent implements OnInit {

  @Input() public type: number;
  public typeName: string;
  configurationForm: FormGroup;
  @Input() public config: Configuration = new Configuration();
  constructor(private fb: FormBuilder, private configService: ConfigurationService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    
    this.typeName = PlayerGameType[this.type].toString();
    this.getSkeetsNames()
    this.createForm();
  }

  createForm(): void {
    this.configurationForm = this.fb.group({
      TimePerShot: [this.config.TimePerShot, Validators.required],
      TimeToRefill: [this.config.TimeToRefill, Validators.required],
      Skeets: this.fb.array([
      ]),
    });
    this.addItem();
  }
  public allSkeets: Skeet[] = [];
  public async getSkeetsNames() {
    this.allSkeets = await this.configService.GetAllSkeets();
  }


  addItem() {
    for (let index = 0; index < this.config.Skeets.length; index++) {
      const element = this.config.Skeets[index];
      const items = this.configurationForm.get('Skeets') as FormArray;
      items.push(
        this.fb.group({
          SkeetID: [element.SkeetID, Validators.required],
          Order: [element.Order, Validators.required]
        })
      );
    }
  }

  get Skeets() {
    return this.configurationForm.get('Skeets') as FormArray;
  }


  async onSubmit(): Promise<void> {
    if (this.configurationForm.valid) {
      const tConfig: Configuration = this.configurationForm.value;
      tConfig.ID = this.config.ID;
      tConfig.NumberOfSkeet = this.config.NumberOfSkeet;
      tConfig.Type = this.type;
      const tResult: number = await this.configService.UpdateConfig(this.config.ID, tConfig);
      if (tResult == 0) {
        this.dialog.open(AlertDialogComponent, {
          data: {
            icon: 'Error',
            message: `The ${this.type} Settings Successuflly Saved`
          }
        });
      } else {
        this.dialog.open(AlertDialogComponent, {
          data: {
            icon: 'Error',
            message: `Error in Saving ${this.type} Settings`
          }
        });
      }
    }
  }

  openAlertDialog(pMessage: string) {
    this.dialog.open(AlertDialogComponent, {
      data: {
        icon: 'Error',
        message: pMessage
      }
    });
  }
  

}
