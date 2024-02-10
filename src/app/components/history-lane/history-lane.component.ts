import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/models/Player';
import { Ticket } from 'src/app/models/Ticket';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { GameType, PlayerLevel } from 'src/app/models/enums';
import { PlayerService } from 'src/app/services/player.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-history-lane',
  templateUrl: './history-lane.component.html',
  styleUrls: ['./history-lane.component.css']
})
export class HistoryLaneComponent implements OnInit {
  public ticket: X_TodayPlayer;
  public currentTicket: Ticket;
  public isReady: boolean = false;
  public playerLevel: string = '';
  public gameType: string = '';
  public player: Player;
  public isActiveTicket: boolean = false;
  constructor(private route: ActivatedRoute, private playerService: PlayerService, public dialogRef: MatDialogRef<HistoryLaneComponent>,
    private ticketService: TicketService, @Inject(MAT_DIALOG_DATA) public laneId: number) { }

  async ngOnInit(): Promise<void> {
    await this.initializeComponenet();
  }

  public async initializeComponenet() {
    try {
      this.ticket = await this.ticketService.GetTicketOnLane(this.laneId);
      if (this.ticket) {
        await this.loadData();
      }
      this.isReady = true;
    } catch (error) {
      console.log(error);
    }
  }

  public async loadData() {
    this.currentTicket = await this.ticketService.GetTicketById(this.ticket.TicketId, true);
    if(this.currentTicket){
      this.player = await this.playerService.GetPlayerById_An(this.ticket.UserId);
      console.log(this.player)
      this.playerLevel = PlayerLevel[this.currentTicket.PlayerLevelId].toString();
      this.gameType = GameType[this.currentTicket.GameTypeId].toString();
      this.isActiveTicket = true;
    }
  }

}
