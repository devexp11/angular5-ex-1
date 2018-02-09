import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', component: SignInComponent },
      { path: 'sign-up/:invitation_code', component: SignUpComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

export const AuthRouter: ModuleWithProviders = RouterModule.forChild(routes);
