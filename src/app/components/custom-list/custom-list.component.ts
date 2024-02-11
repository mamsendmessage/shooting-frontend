import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { CreateTicketModalComponent } from '../create-ticket-modal/create-ticket-modal.component';
import { SocketCommunicationService } from 'src/app/services/socket-communication.service';
import { Player } from 'src/app/models/Player';
import { TicketService } from 'src/app/services/ticket.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { Ticket } from 'src/app/models/Ticket';
@Component({
  selector: 'app-custom-list',
  templateUrl: './custom-list.component.html',
  styleUrls: ['./custom-list.component.css']
})
export class CustomListComponent implements OnInit {

  @Input() public data: X_TodayPlayer[] = [];
  public players: X_TodayPlayer[] = [];
  public isReady: boolean = false;
  @Input() public itemPerPage: number = 10;
  public startIndex = 0;
  public timeout: any = null;
  public searchKey: string = '';
  @Input() public simple: boolean = false;


  public fromDate: Date = new Date();
  public toDate: Date = new Date();

  public fromDateStr: string = new Date().toLocaleDateString();
  public toDateStr: string = new Date().toLocaleDateString();

  constructor(public dialog: MatDialog, private ticketService: TicketService) { }

  async ngOnInit(): Promise<void> {
    this.players = this.data;
    this.isReady = true;
  }

  public async GetTickets() {
    try {
      this.fromDate = new Date(this.fromDate);
      this.toDate = new Date(this.toDate);
      const tNow: Date = new Date();
      tNow.setHours(0, 0, 0, 0);
      this.fromDate.setHours(0, 0, 0, 0)
      this.toDate.setHours(0, 0, 0, 0)
      if (!this.isBefore(this.fromDate, this.toDate)) {
        this.openAlertDialog('From_Date Should Be Before To_Date');
        return;
      } else if (!this.isBefore(this.toDate, tNow)) {
        this.openAlertDialog('To_Date Should Be Before Now');
        return;
      } else if (!this.isBefore(this.fromDate, tNow)) {
        this.openAlertDialog('From_Date Should Be Before Now');
        return;
      }
      const tFilteredPlayers: X_TodayPlayer[] = [];
      const tTickets: X_TodayPlayer[] = await this.ticketService.GetAllTimeTickets();
      for (let index = 0; index < tTickets.length; index++) {
        const element: X_TodayPlayer = tTickets[index];
        element.CreationDate.setHours(0, 0, 0, 0);
        if (this.isBefore(element.CreationDate, this.toDate) && this.isBefore(this.fromDate, element.CreationDate)) {
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
    const dialogRef = this.dialog.open(CreateTicketModalComponent, {
      data: new Player(null)
    });

    // You can subscribe to the afterClosed() event to perform actions when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result:', result);
    });
  }
  public onStateChange(pValue: any) {
    if (pValue.value == "") {
      this.players = this.data;
    } else {
      this.players = this.data.filter((item) => item.State == pValue.value);
    }
  }

  public onTicketTypeChange(pValue: any) {
    if (pValue.value == "") {
      this.players = this.data;
    } else {
      this.players = this.data.filter((item) => item.TicketType == pValue.value);
    }
  }

  public onUserTypeChange(pValue: any) {
    if (pValue.value == "") {
      this.players = this.data;
    } else {
      this.players = this.data.filter((item) => item.UserType == pValue.value);
    }
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
