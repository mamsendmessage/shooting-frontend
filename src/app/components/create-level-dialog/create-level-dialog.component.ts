import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Configuration } from 'src/app/models/Configuration';
import { Result } from 'src/app/models/enums';
import { ConfigurationService } from 'src/app/services/config.service';

@Component({
  selector: 'app-create-level-dialog',
  templateUrl: './create-level-dialog.component.html',
  styleUrls: ['./create-level-dialog.component.css']
})
export class CreateLevelDialogComponent implements OnInit {
  public levelForm: FormGroup;
  constructor(private fb: FormBuilder, private configurationService: ConfigurationService) {
    this.levelForm = this.fb.group({
      Name: ['', Validators.required],
      Image: ['assets/img/pgreen.svg', Validators.required],
      GameType: ['1', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public async CreateLevel() {
    if (this.levelForm.valid) {
      const tLevelName = this.levelForm.get('Name').value;
      const tImagePath = this.levelForm.get('Image').value;
      const tGameType = this.levelForm.get('GameType').value;
      const tConfiguration: Configuration = new Configuration();
      tConfiguration.config = `{"TimePerShot":10,"TimeToRefill":10,"NumberOfSkeet":1,"Skeets":[{"SkeetID":[],"API":[]}],"ID":"-1"}`;
      tConfiguration.NumberOfSkeet = 1;
      tConfiguration.TimePerShot = 10;
      tConfiguration.TimeToRefill = 10;
      const tResult = await this.configurationService.AddConfig(tLevelName, tImagePath, tGameType, tConfiguration);
      if (tResult == Result.SUCCESS) {
        location.reload();
      }
    }
  }
}
