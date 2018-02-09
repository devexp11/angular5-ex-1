import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthRouter } from './auth.router';

import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { UtilsService } from '../providers/utils.service';
import { AuthService } from '../providers/auth/auth.service';

@NgModule({
  imports: [
    AuthRouter,
    RouterModule,
    FormsModule,
    NgbModule,
    CommonModule,
    HttpModule
  ],
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent
  ],
  providers: [
    AuthService,
    UtilsService
  ]
})
export class AuthModule { }
