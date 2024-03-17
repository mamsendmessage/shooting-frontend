import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Lane } from 'src/app/models/Lane';
import { Nationality } from 'src/app/models/Nationality';
import { Player } from 'src/app/models/Player';
import { PlayerLevel } from 'src/app/models/PlayerLevel';
import { Ticket } from 'src/app/models/Ticket';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { GameType } from 'src/app/models/enums';
import { ConfigurationService } from 'src/app/services/config.service';
import { LaneService } from 'src/app/services/lane.service';
import { PlayerService } from 'src/app/services/player.service';
import { SocketCommunicationService } from 'src/app/services/socket-communication.service';
import { TicketService } from 'src/app/services/ticket.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.css']
})
export class LaneComponent implements OnInit {
  public countdown: string = '00:00';
  public laneId: number;
  public ticket: X_TodayPlayer;
  public currentTicket: Ticket;
  public isReady: boolean = false;
  public playerLevel: string = '';
  public gameType: string = '';
  public player: Player;
  public isActiveTicket: boolean = false;
  public playerNationality: string = '';
  public isEnter: boolean = false;
  public remainingMilliseconds: number;
  public isTimerStarted: boolean = false;
  public isTimerPaused: boolean = false;
  public timerInterval: any; // Interval ID
  public PlayerLevels: PlayerLevel[] = [];
  public timerCaption = ''
  constructor(private route: ActivatedRoute, private socketCommunicationService: SocketCommunicationService, private playerService: PlayerService,
    private configurationService: ConfigurationService, private ticketService: TicketService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async params => {
      this.laneId = params['id'];
      await this.initializeComponenet();
    });
  }

  public enter() {
    this.isEnter = true;
  }

  public leave() {
    this.isEnter = false;
  }

  public async initializeComponenet() {
    try {
      //const tLane: Lane = await this.laneService.GetLaneByID(this.laneId);
      this.socketCommunicationService.listenToChange().subscribe(async (pTicket: X_TodayPlayer) => {
        if (pTicket.LaneId == this.laneId) {
          await this.BuildUI();
        }
      });
      this.socketCommunicationService.listenToFinihsTimer().subscribe(async (pData: any) => {
        if (pData.laneId == this.ticket.LaneId) {
          if (pData.timer > 0) {
            await this.BuildUI();
            this.startTimer(pData.timer * 1000, 'Time to Finish')
          }
        }
      });
      this.socketCommunicationService.listenToRefillTimer().subscribe((pData: any) => {
        if (pData.laneId == this.ticket.LaneId) {
          if (pData.timer > 0) {
            this.startTimer(pData.timer * 1000, 'Time to Refill')
          }
        }
      });
      this.socketCommunicationService.listenToTimePerShotTimer().subscribe((pData: any) => {
        if (pData.laneId == this.ticket.LaneId) {
          if (pData.timer > 0) {
            this.startTimer(pData.timer * 1000, 'Time for Next Shot')
          }
        }
      });
      this.socketCommunicationService.listenToFinish().subscribe(async (pData: any) => {
        if (pData.laneId == -100 || (pData.laneId == this.ticket.LaneId && pData.ticketId == this.ticket.TicketId)) {
          await this.FinishTicket();
        }
      });
      this.socketCommunicationService.listenToPause().subscribe(async (pData: any) => {
        if (pData.laneId == -100 || (pData.laneId == this.ticket.LaneId)) {
          window.location.reload();
        }
      });
      this.socketCommunicationService.listenToForceFinish().subscribe(async (pData: any) => {
        if (pData.laneId == -100 || (pData.laneId == this.ticket.LaneId)) {
          window.location.reload();
        }
      });

      this.socketCommunicationService.listenToResume().subscribe(async (pData: any) => {
        if (pData.laneId == -100 || (pData.laneId == this.ticket.LaneId)) {
          window.location.reload();
        }
      });

      await this.BuildUI();
    } catch (error) {
      console.log(error);
    }
  }



  public async BuildUI() {
    try {
      this.ticket = await this.ticketService.GetTicketOnLane(this.laneId);
      if (this.ticket) {
        await this.loadData();
      } else {
        this.isActiveTicket = false;
      }
      this.isReady = true;
    } catch (error) {
      console.log(error);
    }
  }

  public async loadData() {
    this.currentTicket = await this.ticketService.GetTicketById(this.ticket.TicketId);
    if (this.currentTicket) {
      if (this.currentTicket.State == 1) {
        var seconds = (Date.now() - new Date(this.currentTicket.LastModificationDate).getTime()) / 1000;
        const tTimer = (this.currentTicket.GamePeriod - Math.ceil(seconds)) * 1000;
        this.startTimer(tTimer, 'Time to finish')
      }
      this.PlayerLevels = await this.configurationService.GetPlayerLevel(this.currentTicket.GameTypeId);
      this.player = await this.playerService.GetPlayerById_An(this.ticket.UserId);
      this.playerLevel = this.PlayerLevels.find((item) => item.ID == this.currentTicket.PlayerLevelId)?.Name;
      this.gameType = GameType[this.currentTicket.GameTypeId].toString();
      const tNationalites: Nationality[] = await this.configurationService.GetAllNationalites();
      if (tNationalites) {
        const tPlayerNationality: Nationality = tNationalites.find((item) => item.ID == this.player.NationalityId);
        this.playerNationality = tPlayerNationality ? tPlayerNationality.Name : '--';
      }
    }
    this.isActiveTicket = true;
  }

  openAlertDialog(pMessage: string) {
    this.dialog.open(AlertDialogComponent, {
      data: {
        icon: 'Error',
        message: pMessage
      }
    });
  }

  public async UpdateTicketState() {
    try {
      this.currentTicket.State = 1;
      const tUpdateResult = await this.ticketService.UpdateTicketState_Ann(this.currentTicket);
      if (tUpdateResult == -4) {
        this.openAlertDialog('An Error Occured While Performing Your Request, Please Make Sure that only one in game ticket at a time');
      }
      await this.BuildUI();
      if (this.currentTicket.State == 1) {
        var seconds = (Date.now() - new Date(this.currentTicket.LastModificationDate).getTime()) / 1000;
        const tTimer = (this.currentTicket.GamePeriod - Math.ceil(seconds)) * 1000;
        this.startTimer(tTimer, 'Time to finish')
      } else if (this.currentTicket.State == 6) {
        this.pauseTimer();
        this.countdown = '00:00';
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async Pause() {
    try {
      this.currentTicket.State = 6;
      await this.ticketService.UpdateTicketState_Ann(this.currentTicket);
      this.pauseTimer();
      await this.BuildUI();
    } catch (error) {
      console.log(error);
    }
  }

  public async Resume() {
    try {
      this.currentTicket.State = 1;
      await this.ticketService.UpdateTicketState_Ann(this.currentTicket);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  public async FinishTicket() {
    try {
      this.currentTicket.State = 3;
      await this.ticketService.UpdateTicketState_Ann(this.currentTicket);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  public async UpdateLevel(pPlayerLevelId: number) {
    if (this.ticket.State == 4) {
      this.currentTicket.PlayerLevelId = pPlayerLevelId;
      await this.ticketService.UpdateTicketLevel_Ann(this.currentTicket);
      window.location.reload();
    }
  }

  public startTimer(milliseconds, pCaption) {
    if (!this.isTimerStarted) {
      this.remainingMilliseconds = milliseconds;
      this.resumeTimer();
      this.isTimerStarted = true;
      this.timerCaption = pCaption;
    }
  }

  public pauseTimer() {
    clearInterval(this.timerInterval);
    this.isTimerPaused = true;
  }

  public resumeTimer() {
    if (!this.isTimerPaused) {
      this.timerInterval = setInterval(() => {
        // Calculate remaining minutes and seconds
        const minutes = Math.floor(this.remainingMilliseconds / 60000);
        const seconds = Math.floor((this.remainingMilliseconds % 60000) / 1000);

        // Format minutes with leading zero if necessary
        const displayMinutes = minutes < 10 ? '0' + minutes : minutes.toString();

        // Format seconds with leading zero if necessary
        const displaySeconds = seconds < 10 ? '0' + seconds : seconds.toString();

        // Update the display with the remaining time
        this.countdown = `${displayMinutes}:${displaySeconds}`;

        // Decrease remaining milliseconds by 1000 (1 second)
        this.remainingMilliseconds -= 1000;

        // If remaining milliseconds is less than or equal to zero, stop the timer
        if (this.remainingMilliseconds <= 0) {
          clearInterval(this.timerInterval);
          this.isTimerStarted = false;
          this.countdown = '00:00';
          this.timerCaption = '';
        }
      }, 1000);
      this.isTimerPaused = false;
    }
  }
}
