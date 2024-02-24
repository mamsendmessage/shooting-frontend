import { Injectable } from '@angular/core';
import * as SocketIO from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';
import { Constants } from '../models/Constants';
@Injectable({
  providedIn: 'root'
})
export class SocketCommunicationService {

  private clientSocket;
  constructor() {
    this.clientSocket = SocketIO.connect(Constants.BaseServerUrl);
  }

  public listenToChange(): Observable<any> {
    try {
      return new Observable((Subscribe) => {
        this.clientSocket.on("Change", (data) => {
          Subscribe.next(data);
        });
      })
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public listenToCreate(): Observable<any> {
    try {
      return new Observable((Subscribe) => {
        this.clientSocket.on("Create", (data) => {
          Subscribe.next(data);
        })
      })
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public listenToTimer(): Observable<any> {
    try {
      return new Observable((Subscribe) => {
        this.clientSocket.on("TimeUpdate", (data) => {
          Subscribe.next(data);
        })
      })
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public emitToServer(connection: any, data: any): void {
    this.clientSocket.emit(connection, data);
  }
}
