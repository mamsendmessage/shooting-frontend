import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lane } from 'src/app/models/Lane';
import { Nationality } from 'src/app/models/Nationality';
import { Player } from 'src/app/models/Player';
import { Ticket } from 'src/app/models/Ticket';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { GameType, PlayerLevel } from 'src/app/models/enums';
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
  public laneId: number;
  public ticket: X_TodayPlayer;
  public currentTicket: Ticket;
  public isReady: boolean = false;
  public playerLevel: string = '';
  public gameType: string = '';
  public player: Player;
  public isActiveTicket: boolean = false;
  public playerNationality: string = '';
  constructor(private route: ActivatedRoute, private socketCommunicationService: SocketCommunicationService, private playerService: PlayerService,
    private configurationService: ConfigurationService, private ticketService: TicketService) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async params => {
      this.laneId = params['id'];
      await this.initializeComponenet();
    });
  }

  public async initializeComponenet() {
    try {

      //const tLane: Lane = await this.laneService.GetLaneByID(this.laneId);
      this.socketCommunicationService.listenToChange().subscribe(async (pTicket: X_TodayPlayer) => {
        if (pTicket.LaneId == this.laneId) {
          this.ticket = new X_TodayPlayer(pTicket);
          await this.loadData();
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
      this.playerLevel = PlayerLevel[this.currentTicket.PlayerLevelId].toString();
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
}
