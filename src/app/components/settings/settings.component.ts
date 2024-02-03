import { Component, OnInit } from '@angular/core';
import { Configuration } from 'src/app/models/Configuration';
import { Skeet } from 'src/app/models/Skeet';
import { SkeetConfig } from 'src/app/models/SkeetConfig';
import { ConfigurationService } from 'src/app/services/config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public beginnersConfig: Configuration = new Configuration();
  public isReady: boolean = false;
  constructor(private configService: ConfigurationService) { }
  async ngOnInit(): Promise<void> {

    const tConfigs: Configuration[] = await this.configService.GetAllConfig();
    this.beginnersConfig = tConfigs[0];
    if (this.beginnersConfig.Skeets.length <= 0) {
      const tSkeets: Skeet[] = await this.configService.GetAllSkeets();
      let tOrder = 1;
      while (this.beginnersConfig.Skeets.length < this.beginnersConfig.NumberOfSkeet - 1){
        for (let index = 0; index < tSkeets.length; index++) {
          if (tOrder == 26) {
            break;
          }
          const tSkeet = tSkeets[index];
          this.beginnersConfig.Skeets.push(new SkeetConfig(tSkeet.ID, 0, tSkeet.Name, tOrder++))
        }
      }
    }
    this.isReady = true;
  }

}
