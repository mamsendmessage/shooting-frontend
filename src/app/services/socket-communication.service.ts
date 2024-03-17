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

  public listenToRefillTimer(): Observable<any> {
    try {
      return new Observable((Subscribe) => {
        this.clientSocket.on("TimeToRefill", (data) => {
          Subscribe.next(data);
        })
      })
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public listenToFinihsTimer(): Observable<any> {
    try {
      return new Observable((Subscribe) => {
        this.clientSocket.on("TimeToFinish", (data) => {
          Subscribe.next(data);
        })
      })
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  public listenToTimePerShotTimer(): Observable<any> {
    try {
      return new Observable((Subscribe) => {
        this.clientSocket.on("TimePerShot", (data) => {
          Subscribe.next(data);
        })
      })
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public listenToFinish(): Observable<any> {
    try {
      return new Observable((Subscribe) => {
        this.clientSocket.on("FinishTicket", (data) => {
          Subscribe.next(data);
        })
      })
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public listenToForceFinish(): Observable<any> {
    try {
      return new Observable((Subscribe) => {
        this.clientSocket.on("ForceFinishTicket", (data) => {
          Subscribe.next(data);
        })
      })
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public listenToPause(): Observable<any> {
    try {
      return new Observable((Subscribe) => {
        this.clientSocket.on("PauseTicket", (data) => {
          Subscribe.next(data);
        })
      })
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  
  public listenToResume(): Observable<any> {
    try {
      return new Observable((Subscribe) => {
        this.clientSocket.on("ResumeTicket", (data) => {
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
