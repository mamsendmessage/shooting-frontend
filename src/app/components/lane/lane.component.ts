import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lane } from 'src/app/models/Lane';
import { Player } from 'src/app/models/Player';
import { Ticket } from 'src/app/models/Ticket';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { GameType, PlayerLevel } from 'src/app/models/enums';
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
  constructor(private route: ActivatedRoute, private socketCommunicationService: SocketCommunicationService, private playerService: PlayerService,
    private ticketService: TicketService, private laneService: LaneService) { }

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
          this.currentTicket = await this.ticketService.GetTicketById(pTicket.TicketId);
          this.player = await this.playerService.GetPlayerById_An(pTicket.UserId);
          this.playerLevel = PlayerLevel[this.currentTicket.PlayerLevelId].toString();
          this.gameType = GameType[this.currentTicket.GameTypeId].toString();
        }
      });
      this.ticket = await this.ticketService.GetTicketOnLane(this.laneId);
      if (this.ticket) {
        this.currentTicket = await this.ticketService.GetTicketById(this.ticket.TicketId);
        this.player = await this.playerService.GetPlayerById_An(this.ticket.UserId);
        this.playerLevel = PlayerLevel[this.currentTicket.PlayerLevelId].toString();
        this.gameType = GameType[this.currentTicket.GameTypeId].toString();
        console.log(`From Lane (${this.laneId}) Component ` + JSON.stringify(this.ticket));
      } else {
        console.log('There is no Ticket Allocated to this Lane');
      }
      this.isReady = true;
    } catch (error) {
      console.log(error);
    }
  }

}
