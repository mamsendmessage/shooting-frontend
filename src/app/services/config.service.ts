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
          tSkeets.push(new Skeet(+element.ID, element.Name));
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
          let tConfiguration = new Configuration(element)
          if (element.Config && element.Config.length > 0) {
            tConfiguration = JSON.parse(element.Config) as Configuration;
          } else {
            tConfiguration = new Configuration(element);

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

  public async GetAllNationalites(): Promise<Skeet[]> {
    try {
      const tUrl: string = `${this.url}/nationalities`;
      if (this.nationalities && this.nationalities.length > 0) {
        return this.nationalities;
      } else {
        this.nationalities = [];
        const tResponse: APIResponse = await this.communicationService.getData(tUrl);
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

}
