import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/models/Constants';
import { Player } from 'src/app/models/Player';
import { Ticket } from 'src/app/models/Ticket';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { PlayerService } from 'src/app/services/player.service';
import { SocketCommunicationService } from 'src/app/services/socket-communication.service';
import { TicketService } from 'src/app/services/ticket.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-allocate-diaload',
  templateUrl: './allocate-diaload.component.html',
  styleUrls: ['./allocate-diaload.component.css']
})
export class AllocateDialoadComponent implements OnInit {
  public isReady: boolean = false;
  public player: Player;
  public level: string;
  public photo: string;
  public numOfTickets: number;
  allowedStatusForCancel: number[] = [0, 2,];
  allowedStatusForReady: number[] = [0, 2,];
  public isLaneReady: boolean = true;

  constructor(public dialogRef: MatDialogRef<AllocateDialoadComponent>, @Inject(MAT_DIALOG_DATA) public ticket: X_TodayPlayer, private socketService: SocketCommunicationService, private playerService: PlayerService, private ticketService: TicketService, public dialog: MatDialog) { }
  async ngOnInit(): Promise<void> {
    this.player = await this.playerService.GetPlayerById(this.ticket.UserId);
    this.level = this.ticket.PlayerLevel;
    this.photo = Constants.BaseServerUrl + this.player.Photo;
    this.isReady = true;
    this.numOfTickets = (await this.ticketService.GetUserTickets(this.player.ID)).length;
    const tTicket: X_TodayPlayer = await this.ticketService.GetTicketOnLane(this.ticket.LaneId, true);
    if (tTicket.State == 1) {
      this.isLaneReady = false;
    }
    this.isReady = true;
  }

  public async sendDataToLanePage() {
    const tTicket: Ticket = new Ticket(null);
    tTicket.ID = this.ticket.TicketId;
    tTicket.State = 4;
    const tResult = await this.ticketService.UpdateTicketState(tTicket);
    if (tResult == 0) {
      this.close();
    } else {
      this.openAlertDialog('An Error Occured While Performing Your Request, Please Check with the Adminstriator');
    }
    this.socketService.emitToServer("Change", this.ticket);
  }
  public async CancelTicket() {
    const tTicket: Ticket = new Ticket(null);
    tTicket.ID = this.ticket.TicketId;
    tTicket.State = 5;
    const tResult = await this.ticketService.UpdateTicketState(tTicket);
    if (tResult == 0) {
      this.close();
    } else {
      this.openAlertDialog('An Error Occured While Performing Your Request, Please Check with the Adminstriator');
    }
    this.socketService.emitToServer("Change", this.ticket);
  }
  openAlertDialog(pMessage: string) {
    this.dialog.open(AlertDialogComponent, {
      data: {
        icon: 'Error',
        message: pMessage
      }
    });
  }
  public close() {
    this.dialogRef.close();
    location.reload();
  }

}
