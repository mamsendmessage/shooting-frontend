import { Component, Input, OnInit } from '@angular/core';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { TicketState } from 'src/app/models/enums';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-statistics',
  templateUrl: './ticket-statistics.component.html',
  styleUrls: ['./ticket-statistics.component.css']
})
export class TicketStatisticsComponent implements OnInit {

  @Input() public data: X_TodayPlayer[] = [];
  public numberOfUnusedTicket: number = -1;
  public numberOfUsedTicket: number = -1;
  public numberOfTodayTickets: number = -1;
  public numberOfTotalTickets: string = '';
  public isReady: boolean = false;
  constructor(private ticketService: TicketService) { }

  async ngOnInit(): Promise<void> {
    const tUsedTicket: X_TodayPlayer[] = this.data.filter((item) => item.State == TicketState.Finished);
    this.numberOfTodayTickets = this.data.length;
    this.numberOfUsedTicket = tUsedTicket.length;
    this.numberOfUnusedTicket = this.numberOfTodayTickets - this.numberOfUsedTicket;
    const tTickets = await this.ticketService.GetTickets();
    this.numberOfTotalTickets = (tTickets.length).toLocaleString("en-US");;
    this.isReady = true;
  }

}
