import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnChanges {

  public currentPage: number = 1;
  public isReady = false;
  @Input() data: X_TodayPlayer[] = [];
  @Input() itemsPerPage: number = 6;
  players: X_TodayPlayer[] = [];


  constructor() { }

  ngOnInit(): void {
    this.fillDataToDisplay(1);
    this.isReady = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isReady = false;
    this.data = changes['data'].currentValue;
    this.fillDataToDisplay(1);
    this.isReady = true;
  }

  public fillDataToDisplay(pValue: number) {
    this.currentPage = pValue
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = (startIndex + this.itemsPerPage) > this.data.length  ? this.data.length: (startIndex + this.itemsPerPage);
    this.players = this.data.slice(startIndex, endIndex);
  }
}
