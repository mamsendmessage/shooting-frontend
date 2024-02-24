import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTicketModalComponent } from '../create-ticket-modal/create-ticket-modal.component';
import { Player } from 'src/app/models/Player';
import { TicketService } from 'src/app/services/ticket.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { CreateOnlyPlayerModalComponent } from '../create-only-player-modal/create-only-player-modal.component';
import { CreateOnlyTicketModalComponent } from '../create-only-ticket-modal/create-only-ticket-modal.component';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  @Input() public data: Player[] = [];
  public players: Player[] = [];
  public isReady: boolean = false;
  @Input() public itemPerPage: number = 10;
  public startIndex = 0;
  public timeout: any = null;
  public searchKey: string = '';
  @Input() public simple: boolean = false;
  @Input() public source: string;

  public fromDate: Date = new Date();
  public toDate: Date = new Date();


  constructor(public dialog: MatDialog, private playerService: PlayerService) { }

  async ngOnInit(): Promise<void> {
    this.players = this.data;
    this.isReady = true;
  }

  public async Filter() {
    try {
      const tFromDate = new Date(this.fromDate);
      const tToDate = new Date(this.toDate);
      tFromDate.setHours(0, 0, 0, 0);
      tToDate.setHours(0, 0, 0, 0);
      if (!this.isBefore(tFromDate, tToDate)) {
        this.openAlertDialog('From_Date Should Be Before To_Date');
        return;
      }
      const tFilteredPlayers: Player[] = [];
      const tPlayers: Player[] = await this.playerService.GetAllPlayers();
      for (let index = 0; index < tPlayers.length; index++) {
        const element: Player = tPlayers[index];
        element.MembershipExpiry = new Date(element.MembershipExpiry);
        element.MembershipExpiry.setHours(0, 0, 0, 0);
        if (this.isBefore(element.MembershipExpiry, tToDate) && this.isBefore(tFromDate, element.MembershipExpiry)) {
          tFilteredPlayers.push(element);
        }
      }
      this.players = tFilteredPlayers;
    } catch (error) {
      console.log(error);
    }
  }

  public isBefore(date1, date2) {
    return date1 <= date2;
  }

  public openCreateUserDialog(): void {

    let dialogRef;
    dialogRef = this.dialog.open(CreateOnlyPlayerModalComponent, {
      maxHeight: "95vh"
    });
    // You can subscribe to the afterClosed() event to perform actions when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result:', result);
    });
  }


  public updateItemPerPage(pValue: any) {
    if (isNaN(pValue)) {
    } else {
      this.itemPerPage = pValue;
    }
  }

  public updateCurrentPage(pValue: any) {
    if (isNaN(pValue)) {
    } else {
      this.startIndex = pValue;
    }
  }

  public onKeySearch(event: any) {
    clearTimeout(this.timeout);
    const that = this;
    this.timeout = setTimeout(async () => {
      if (event.keyCode != 13) {
        that.players = that.data.filter((item) => item.Name.toLocaleLowerCase().includes(this.searchKey.toLocaleLowerCase()));
      }
    }, 1000);
  }

  openAlertDialog(pMessage: string) {
    this.dialog.open(AlertDialogComponent, {
      data: {
        icon: 'Error',
        message: pMessage
      }
    });
  }
}
