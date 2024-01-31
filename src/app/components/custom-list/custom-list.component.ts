import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { CreateTicketModalComponent } from '../create-ticket-modal/create-ticket-modal.component';
@Component({
  selector: 'app-custom-list',
  templateUrl: './custom-list.component.html',
  styleUrls: ['./custom-list.component.css']
})
export class CustomListComponent implements OnInit {

  @Input() public data: X_TodayPlayer[] = [];
  public players: X_TodayPlayer[] = [];
  public isReady: boolean = false;
  public itemPerPage: number = 10;
  constructor(public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.players = this.data;
    this.isReady = true;
  }

  public openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateTicketModalComponent, {
    });

    // You can subscribe to the afterClosed() event to perform actions when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result:', result);
    });
  }
  public OpenModal(){
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

}
