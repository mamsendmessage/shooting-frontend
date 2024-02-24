import { Component, OnInit } from '@angular/core';
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
  constructor(private route: ActivatedRoute, private socketCommunicationService: SocketCommunicationService, private playerService: PlayerService,
    private configurationService: ConfigurationService, private ticketService: TicketService) { }

  async ngOnInit(): Promise<void> {
    this.PlayerLevels = await this.configurationService.GetPlayerLevel();
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
          location.reload();
        }
      });
      this.socketCommunicationService.listenToTimer().subscribe(async (pData: any) => {
        if (pData.laneId == this.ticket.LaneId && pData.timer > 0) {
          this.startTimer(pData.timer * 1000)
        }
      });


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
      console.log(this.currentTicket);
      this.player = await this.playerService.GetPlayerById_An(this.ticket.UserId);
      const tPlayerLevels = await this.configurationService.GetPlayerLevel();
      this.playerLevel = tPlayerLevels.find((item) => item.ID == this.currentTicket.PlayerLevelId)?.Name;
      this.gameType = GameType[this.currentTicket.GameTypeId].toString();
      const tNationalites: Nationality[] = await this.configurationService.GetAllNationalites();
      if (tNationalites) {
        const tPlayerNationality: Nationality = tNationalites.find((item) => item.ID == this.player.NationalityId);
        this.playerNationality = tPlayerNationality ? tPlayerNationality.Name : '--';
      }
    }
    this.isActiveTicket = true;
  }

  public async UpdateTicketState() {
    try {
      this.currentTicket.State = 1;
      await this.ticketService.UpdateTicketState_Ann(this.currentTicket);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  public async Pause() {
    try {
      this.currentTicket.State = 6;
      await this.ticketService.UpdateTicketState_Ann(this.currentTicket);
      this.pauseTimer();
      window.location.reload();
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

  public startTimer(milliseconds) {
    if (!this.isTimerStarted) {
      this.remainingMilliseconds = milliseconds;
      this.resumeTimer();
      this.isTimerStarted = true;
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
        }
      }, 1000);
      this.isTimerPaused = false;
    }
  }
}
