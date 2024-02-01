import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { X_TodayPlayer } from '../../models/X_TodayPlayers';

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
  players: X_TodayPlayer[] = [];


  constructor() { }

  ngOnInit(): void {
    this.fillDataToDisplay(1);
    this.isReady = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isReady = false;
    if (changes['itemsPerPage']) {
      this.itemsPerPage = changes['itemsPerPage'].currentValue
    }
    if (changes['data']) {
      this.data = changes['data'].currentValue;
    }
    this.fillDataToDisplay(1);
    this.isReady = true;
  }

  public fillDataToDisplay(pValue: number) {
    this.currentPage = pValue
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = (startIndex + this.itemsPerPage) > this.data.length ? this.data.length : (startIndex + this.itemsPerPage);
    this.players = this.data.slice(startIndex, endIndex);
  }

  public updateItemPerPage(pValue: any) {
    this.itemsPerPage = +pValue.value;
  }
}
