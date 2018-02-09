import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieModule } from 'ngx-cookie';

import { AppRouter } from './app.router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { OnlyLoggedinUserGuard } from './guards/index';
import { AuthService } from './providers/auth/auth.service';
import { UtilsService } from './providers/utils.service';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { TimerService } from './providers/timer/timer.service';
import { DownloadClientComponent } from './download-client/download-client.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ComingSoonComponent,
    DownloadClientComponent,
  ],
  imports: [
    AppRouter,
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    CookieModule.forRoot(),
  ],
  providers: [
    AuthService,
    UtilsService,
    OnlyLoggedinUserGuard,
    TimerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
