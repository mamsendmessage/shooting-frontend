import { Injectable } from '@angular/core';
import { CommunicationService } from '../communication/communication.service';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { Result } from '../models/enums';
import { User } from '../models/user';
import { UserManagementService } from './user-management.service';
import { Lane } from '../models/Lane';
import { APIResponse } from '../models/APIResponse';
import { Constants } from '../models/Constants';
import { Skeet } from '../models/Skeet';
import { Configuration } from '../models/Configuration';
import { Nationality } from '../models/Nationality';
import { SessionsTime } from '../models/SessionsTime';
import { PlayerLevel } from '../models/PlayerLevel';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private serviceName: string = 'config';
  private url: string = `${Constants.APIServerUrl}/${this.serviceName}`
  private nationalities: Nationality[] = [];

  constructor(private communicationService: CommunicationService) {

  }

  public async GetAllSkeets(): Promise<Skeet[]> {
    const tSkeets: Skeet[] = [];
    try {
      const tUrl: string = `${this.url}/skeets`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tSkeets.push(new Skeet(+element.ID, element.Name, element.API));
        }
      }
      return tSkeets;
    } catch (error) {
      console.log(error);
      return tSkeets;
    }
  }

  public async GetAllConfig(): Promise<Configuration[]> {
    const tConfigurations: Configuration[] = [];
    try {
      const tUrl: string = `${this.url}`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          let tConfiguration = new Configuration(element);
          if (element.Config && element.Config.length > 0) {
            tConfiguration.config = element.Config;
          }
          tConfigurations.push(tConfiguration);
        }
      }
      return tConfigurations;
    } catch (error) {
      console.log(error);
      return tConfigurations;
    }
  }

  public async GetAllNationalites(): Promise<Nationality[]> {
    try {
      const tUrl: string = `${Constants.APIAnonymousServerUrl}/lanes/nationalities`;
      if (this.nationalities && this.nationalities.length > 0) {
        return this.nationalities;
      } else {
        this.nationalities = [];
        const tResponse: APIResponse = await this.communicationService.postData(tUrl, {});
        if (tResponse.result == 0) {
          for (let index = 0; index < tResponse.payload.length; index++) {
            const element = tResponse.payload[index];
            this.nationalities.push(new Nationality(+element.ID, element.Name));
          }
        }
      }
      return this.nationalities;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  public async UpdateConfig(pConfigId: number, pConfig: Configuration) {
    try {
      const tUrl: string = `${this.url}/${pConfigId}`;
      const tResponse: APIResponse = await this.communicationService.putData(tUrl, pConfig);
      return tResponse?.result;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }


  public async AddConfig(pLevelName: string, pImagePath: string, pConfig: Configuration) {
    try {
      const tUrl: string = `${this.url}/AddConfig`;
      const tResponse: APIResponse = await this.communicationService.postData(tUrl, {
        config: pConfig,
        level: pLevelName,
        image: pImagePath
      });
      return tResponse?.result;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  public async GetSessionsTime(): Promise<SessionsTime[]> {
    const tsessions: SessionsTime[] = [];
    try {
      const tUrl: string = `${this.url}/sessions-time`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tsessions.push(new SessionsTime(+element.ID, element.Name));
        }
      }
      return tsessions;
    } catch (error) {
      console.log(error);
      return tsessions;
    }
  }
  public async GetPlayerLevel(): Promise<PlayerLevel[]> {
    const tLevels: PlayerLevel[] = [];
    try {
      const tUrl: string = `${Constants.APIAnonymousServerUrl}/lanes/levels`;
      const tResponse: APIResponse = await this.communicationService.postData(tUrl, {});
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tLevels.push(new PlayerLevel(+element.ID, element.Name, element.Image));
        }
      }
      return tLevels;
    } catch (error) {
      console.log(error);
      return tLevels;
    }
  }
}
