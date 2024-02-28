import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Nationality } from 'src/app/models/Nationality';
import { Player } from 'src/app/models/Player';
import { PlayerLevel } from 'src/app/models/PlayerLevel';
import { Ticket } from 'src/app/models/Ticket';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { GameType } from 'src/app/models/enums';
import { ConfigurationService } from 'src/app/services/config.service';
import { PlayerService } from 'src/app/services/player.service';
import { SocketCommunicationService } from 'src/app/services/socket-communication.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-history-lane',
  templateUrl: './history-lane.component.html',
  styleUrls: ['./history-lane.component.css']
})
export class HistoryLaneComponent implements OnInit {
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
  public PlayerLevels: PlayerLevel[] = [];
  constructor(private route: ActivatedRoute, private socketCommunicationService: SocketCommunicationService, private playerService: PlayerService,
    private configurationService: ConfigurationService, private ticketService: TicketService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async params => {
      this.laneId = this.data
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
      this.PlayerLevels = await this.configurationService.GetPlayerLevel();
      this.ticket = await this.ticketService.GetTicketOnLane(this.laneId, true);
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
      await this.initializeComponenet();
    } catch (error) {
      console.log(error);
    }
  }

  public async Pause() {
    try {
      this.currentTicket.State = 6;
      await this.ticketService.UpdateTicketState_Ann(this.currentTicket);
      await this.initializeComponenet();
    } catch (error) {
      console.log(error);
    }
  }

  public async Resume() {
    try {
      this.currentTicket.State = 1;
      await this.ticketService.UpdateTicketState_Ann(this.currentTicket);
      await this.initializeComponenet();
    } catch (error) {
      console.log(error);
    }
  }

  public async FinishTicket() {
    try {
      this.currentTicket.State = 3;
      await this.ticketService.UpdateTicketState_Ann(this.currentTicket);
      await this.initializeComponenet();
    } catch (error) {
      console.log(error);
    }
  }

  public async UpdateLevel(pPlayerLevelId: number) {
    this.currentTicket.PlayerLevelId = pPlayerLevelId;
    await this.ticketService.UpdateTicketLevel_Ann(this.currentTicket);
  }

}
