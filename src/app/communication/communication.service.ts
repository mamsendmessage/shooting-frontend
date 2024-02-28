import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient) { }

  public async getData(pUrl: string): Promise<any> {
    try {
      const tResponse = await this.http.get(pUrl).toPromise();
      return tResponse;
    } catch (error) {
      return undefined;
    }
  }

  public async download(pUrl: string) {
    try {
      return this.http.get(pUrl, { responseType: 'blob' })
    } catch (error) {
      return undefined;
    }
  }

  public async postData(pUrl: string, pBody: any): Promise<any> {
    try {
      const tOptions = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const tResponse = await this.http.post(pUrl, pBody, tOptions).toPromise();
      return tResponse;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public async putData(pUrl: string, pBody: any): Promise<any> {
    try {
      const tOptions = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const tResponse = await this.http.post(pUrl, pBody).toPromise();
      return tResponse;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public async deleteData(pUrl: string): Promise<any> {
    try {
      const tResponse = await this.http.delete(pUrl).toPromise();
      return tResponse;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

}
