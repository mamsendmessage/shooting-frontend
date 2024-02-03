// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SummaryStatisticsComponent } from './components/summary-statistics/summary-statistics.component';
import { ReciptionComponent } from './components/reciption/reciption.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CustomListComponent } from './components/custom-list/custom-list.component';
import { TicketStatisticsComponent } from './components/ticket-statistics/ticket-statistics.component';
import { CreateTicketModalComponent } from './components/create-ticket-modal/create-ticket-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { CameraComponent } from './components/camera/camera.component';
import {WebcamModule} from 'ngx-webcam';
import { SmallUserListComponent } from './components/small-user-list/small-user-list.component';
import { LanesComponent } from './components/lanes/lanes.component';
import { NormalConfigComponent } from './components/normal-config/normal-config.component';
import { CompetitionConfigComponent } from './components/competition-config/competition-config.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    PaginationComponent,
    TableComponent,
    LoaderComponent,
    SlideMenuComponent,
    TopbarComponent,
    SummaryStatisticsComponent,
    ReciptionComponent,
    TicketsComponent,
    SettingsComponent,
    CustomListComponent,
    TicketStatisticsComponent,
    CreateTicketModalComponent,
    CameraComponent,
    SmallUserListComponent,
    LanesComponent,
    NormalConfigComponent,
    CompetitionConfigComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    BrowserAnimationsModule,
    WebcamModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
