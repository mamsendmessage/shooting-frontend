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
  public competitionConfig: Configuration = new Configuration();
  public isReady: boolean = false;
  constructor(private configService: ConfigurationService) { }
  async ngOnInit(): Promise<void> {

    const tConfigs: Configuration[] = await this.configService.GetAllConfig();
    if (tConfigs && tConfigs.length > 0) {
      this.beginnersConfig = tConfigs.find((item) => item.Type == 1);
      this.intermidateConfig = tConfigs.find((item) => item.Type == 2);
      this.profissionalConfig = tConfigs.find((item) => item.Type == 3);
      this.competitionConfig = tConfigs.find((item) => item.Type == 4);
    }
    this.isReady = true;
  }


}
