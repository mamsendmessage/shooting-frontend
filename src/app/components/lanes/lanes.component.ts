import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lane } from 'src/app/models/Lane';
import { Ticket } from 'src/app/models/Ticket';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { LaneService } from 'src/app/services/lane.service';
import { PlayerService } from 'src/app/services/player.service';
import { TicketService } from 'src/app/services/ticket.service';
import { HistoryLaneComponent } from '../history-lane/history-lane.component';

@Component({
  selector: 'app-lanes',
  templateUrl: './lanes.component.html',
  styleUrls: ['./lanes.component.css']
})
export class LanesComponent implements OnInit {
  public lanes: Lane[] = [];
  @Output() selectedLaneId = new EventEmitter<number>();
  @Input() public active: boolean = true;
  constructor(private laneService: LaneService, private playerService: PlayerService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    const tTodayTickets: X_TodayPlayer[] = await this.playerService.GetTodayPlayers();

    this.lanes = await this.laneService.GetAllLanes();

    const tReservedLanes: Lane[] = await this.laneService.GetReservedLanes();
    const tReservedLanesIDs = tReservedLanes.map((item) => item.ID);
    for (let index = 0; index < this.lanes.length; index++) {
      const tLane = this.lanes[index];
      const tCurrentTicketOnLane = tTodayTickets.find((item) => item.State == 1 && item.LaneId == tLane.ID);
      if (tCurrentTicketOnLane) {
        var today = new Date();
        var diffMs = (today.getTime() - tCurrentTicketOnLane.CreationDate.getTime());
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        tLane.RemainingMinuts = diffMins;
      } else {
        tLane.RemainingMinuts = 0;
      }

      if (tReservedLanesIDs.includes(tLane.ID)) {
        tLane.isReserved = true;
      }
    }


    for (let index = 0; index < this.lanes.length; index++) {
      const element = this.lanes[index];
      if (tReservedLanesIDs.includes(element.ID)) {
        element.isReserved = true;
      }
    }
  }

  public SelectLane(pId: number) {
    if (this.active) {
      this.selectedLaneId.emit(pId);
      for (let index = 0; index < this.lanes.length; index++) {
        const element = this.lanes[index];
        if (element.ID == pId) {
          element.isSelected = true;
        } else {
          element.isSelected = false;
        }
      }
    } else {
      this.dialog.open(HistoryLaneComponent, {
        data: pId,
        width: "1200px",
        height: "700px",
        panelClass:"custom-dialog"
      })
    }
  }

}
