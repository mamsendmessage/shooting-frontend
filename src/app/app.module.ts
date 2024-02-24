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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { CameraComponent } from './components/camera/camera.component';
import { WebcamModule } from 'ngx-webcam';
import { SmallUserListComponent } from './components/small-user-list/small-user-list.component';
import { LanesComponent } from './components/lanes/lanes.component';
import { NormalConfigComponent } from './components/normal-config/normal-config.component';
import { CompetitionConfigComponent } from './components/competition-config/competition-config.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { DEFAULT_TIMEOUT, HttpInterceptorService } from './communication/http-interceptor.service';
import { SkeetConffigComponent } from './components/skeet-conffig/skeet-conffig.component';
import { LaneComponent } from './components/lane/lane.component';
import { AllocateDialoadComponent } from './components/allocate-diaload/allocate-diaload.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { HistoryLaneComponent } from './components/history-lane/history-lane.component';
import { LogarithmicChartComponent } from './components/logarithmic-chart/logarithmic-chart.component';
import { ChartModule } from 'angular-highcharts';
import { ColumnChartComponent } from './components/column-chart/column-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { CreateOnlyTicketModalComponent } from './components/create-only-ticket-modal/create-only-ticket-modal.component';
import { CreateOnlyPlayerModalComponent } from './components/create-only-player-modal/create-only-player-modal.component';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { AdminConsoleComponent } from './components/admin-console/admin-console.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { CreateDialogComponent } from './components/user-management/create-dialog/create-dialog.component';
import { CreateRoleDialogComponent } from './components/role-management/create-role-dialog/create-role-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CreateLevelDialogComponent } from './components/create-level-dialog/create-level-dialog.component';
import { SetPasswordDialogComponent } from './components/user-management/set-password-dialog/set-password-dialog.component';
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
    CompetitionConfigComponent,
    UserProfileComponent,
    AlertDialogComponent,
    SkeetConffigComponent,
    LaneComponent,
    AllocateDialoadComponent,
    HistoryLaneComponent,
    LogarithmicChartComponent,
    ColumnChartComponent,
    PieChartComponent,
    CreateOnlyTicketModalComponent,
    CreateOnlyPlayerModalComponent,
    PlayerTableComponent,
    PlayerListComponent,
    AdminConsoleComponent,
    UserManagementComponent,
    RoleManagementComponent,
    CreateDialogComponent,
    CreateRoleDialogComponent,
    ConfirmDialogComponent,
    CreateLevelDialogComponent,
    SetPasswordDialogComponent,
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
    WebcamModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ChartModule,
    MatTabsModule,
    MatButtonToggleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: DEFAULT_TIMEOUT, useValue: 5000 }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
