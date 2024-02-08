import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lane } from 'src/app/models/Lane';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { LaneService } from 'src/app/services/lane.service';
import { SocketCommunicationService } from 'src/app/services/socket-communication.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.css']
})
export class LaneComponent implements OnInit {
  public laneId: number;
  public ticket: X_TodayPlayer;
  public isReady: boolean = false;
  constructor(private route: ActivatedRoute, private socketCommunicationService: SocketCommunicationService, private ticketService: TicketService, private laneService: LaneService) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async params => {
      this.laneId = params['id'];
      await this.initializeComponenet();
    });
  }

  public async initializeComponenet() {
    try {
      //const tLane: Lane = await this.laneService.GetLaneByID(this.laneId);
      this.socketCommunicationService.listenToChange().subscribe((pTicket: X_TodayPlayer) => {
        if (pTicket.LaneId == this.laneId) {
          this.ticket = new X_TodayPlayer(pTicket);
        }
      });
      this.ticket = await this.ticketService.GetTicketOnLane(this.laneId);
      if (this.ticket) {
        console.log(`From Lane (${this.laneId}) Component ` + JSON.stringify(this.ticket));
      } else {
        console.log('There is no Ticket Allocated to this Lane');
      }
      this.isReady = true;
    } catch (error) {
      console.log(error);
    }
  }

}
