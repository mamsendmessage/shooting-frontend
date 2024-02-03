import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';

@Component({
  selector: 'app-small-user-list',
  templateUrl: './small-user-list.component.html',
  styleUrls: ['./small-user-list.component.css']
})
export class SmallUserListComponent implements OnInit, OnChanges {

  public players: X_TodayPlayer[] = [];
  @Input() public data: X_TodayPlayer[] = [];
  public isReady: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.players = this.data;
    this.isReady = true;
  }


  public UpdatePlayersDate(){
    try {
      for (let index = 0; index < this.players.length; index++) {
        const element = this.players[index];
        element.DisplayedDateTime = element.CreationDate.toLocaleDateString();
        
      }
    } catch (error) {
      
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isReady = false;
    if (changes['data']) {
      this.data = changes['data'].currentValue;
      this.UpdatePlayersDate();
    }
    this.isReady = true;
  }

}
