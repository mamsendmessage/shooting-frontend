import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { X_TodayPlayer } from '../../models/X_TodayPlayers';
import { Constants } from 'src/app/models/Constants';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { AllocateDialoadComponent } from '../allocate-diaload/allocate-diaload.component';
import { Player } from 'src/app/models/Player';
import { Nationality } from 'src/app/models/Nationality';
import { ConfigurationService } from 'src/app/services/config.service';
import { CreateOnlyPlayerModalComponent } from '../create-only-player-modal/create-only-player-modal.component';
@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit, OnChanges {

  public currentPage: number = 1;
  public isReady = false;
  @Input() data: Player[] = [];
  @Input() itemsPerPage: number = 10;
  @Input() startIndex: number = 0;
  players: Player[] = [];
  public nationalities: Nationality[] = [];
  public myImgUrl: string = 'assets/img/profile-8.jpg';

  constructor(public dialog: MatDialog, private configService: ConfigurationService) { }

  async ngOnInit(): Promise<void> {
    this.nationalities = await this.configService.GetAllNationalites();
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      element.Photo = element.Photo && element.Photo.length > 0 ? Constants.BaseServerUrl + element.Photo : this.myImgUrl;
      element.Nationality = this.nationalities.find((item) => item.ID == element.NationalityId).Name;
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

  public async openCreateUserDialog(pPlayer: Player): Promise<void> {

   
    const dialogRef = this.dialog.open(CreateOnlyPlayerModalComponent, {
      maxHeight: "95vh",
      data: pPlayer,
      
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
