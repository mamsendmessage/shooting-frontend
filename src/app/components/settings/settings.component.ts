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
  public intermidateConfig: Configuration = new Configuration();
  public profissionalConfig: Configuration = new Configuration();

  public isReady: boolean = false;
  constructor(private configService: ConfigurationService) { }
  async ngOnInit(): Promise<void> {

    const tConfigs: Configuration[] = await this.configService.GetAllConfig();
    if (tConfigs && tConfigs.length > 0) {
      this.beginnersConfig = tConfigs.find((item) => item.Type == 1);
      this.intermidateConfig = tConfigs.find((item) => item.Type == 2);
      this.profissionalConfig = tConfigs.find((item) => item.Type == 3);

      await this.updateConfig(this.beginnersConfig);
      await this.updateConfig(this.intermidateConfig);
      await this.updateConfig(this.profissionalConfig);

    }
    this.isReady = true;
  }

  public async updateConfig(pConfig: Configuration) {
    if (pConfig || pConfig.Skeets.length <= 0) {
      const tSkeets: Skeet[] = await this.configService.GetAllSkeets();
      let tOrder = 1;
      if (tSkeets && tSkeets.length > 0) {
        while (pConfig.Skeets.length < pConfig.NumberOfSkeet - 1) {
          for (let index = 0; index < tSkeets.length; index++) {
            if (tOrder == 26) {
              break;
            }
            const tSkeet = tSkeets[index];
            pConfig.Skeets.push(new SkeetConfig(tSkeet.ID, tSkeet.Name, tOrder++))
          }
        }
      }
    }
  }

}
