import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Constants } from 'src/app/models/Constants';
import { Player } from 'src/app/models/Player';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { PlayerService } from 'src/app/services/player.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public isReady: boolean = false;
  public player: Player;
  public level: string;
  public photo: string;
  public numOfTickets: number;
  constructor(public dialogRef: MatDialogRef<UserProfileComponent>,
    private ticketService: TicketService,
    private playerService: PlayerService, @Inject(MAT_DIALOG_DATA) public pData: any) {
  }
  async ngOnInit(): Promise<void> {
    this.player = await this.playerService.GetPlayerById(this.pData.playerId);
    this.level = this.pData.PlayerLevel ? this.pData.PlayerLevel : null;
    this.photo = Constants.BaseServerUrl + this.player.Photo;
    this.isReady = true;
    this.numOfTickets = (await this.ticketService.GetUserTickets(this.player.ID)).length;
  }

}
