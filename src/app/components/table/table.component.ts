import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { X_TodayPlayer } from '../../models/X_TodayPlayers';
import { Constants } from 'src/app/models/Constants';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  public currentPage: number = 1;
  public isReady = false;
  @Input() data: X_TodayPlayer[] = [];
  @Input() itemsPerPage: number = 10;
  @Input() startIndex: number = 0;
  players: X_TodayPlayer[] = [];
  public myImgUrl: string = 'assets/img/profile-8.jpg';

  constructor(public dialog: MatDialog, private playerService: PlayerService) { }

  ngOnInit(): void {
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      element.Photo = element.Photo && element.Photo.length > 0 ? Constants.BaseServerUrl + element.Photo?.replace('images', '') : this.myImgUrl;
    }
    this.isReady = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isReady = false;
    if (changes['itemsPerPage']) {
      this.itemsPerPage = +changes['itemsPerPage'].currentValue
    }
    if (changes['data']) {
      this.data = changes['data'].currentValue;
    }
    if (changes['startIndex']) {
      this.startIndex = +changes['startIndex'].currentValue;
    }
    this.fillDataToDisplay();
    this.isReady = true;
  }

  public fillDataToDisplay() {
    const startIndex = this.startIndex;
    const endIndex = (startIndex + this.itemsPerPage) > this.data.length ? this.data.length : (startIndex + this.itemsPerPage);
    this.players = this.data.slice(startIndex, endIndex);
  }

  public updateItemPerPage(pValue: any) {
    this.itemsPerPage = +pValue.value;
  }

  public selectItem(pTikcet) {

    this.openCreateUserDialog(pTikcet);
  }

  public async openCreateUserDialog(pTikcet): Promise<void> {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      data: pTikcet,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
