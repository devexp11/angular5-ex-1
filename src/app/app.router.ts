import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DownloadClientComponent } from './download-client/download-client.component';
import { OnlyLoggedinUserGuard } from './guards/index';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'download-client', component: DownloadClientComponent },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
  {
    path: 'user',
    /*canActivate: [OnlyLoggedinUserGuard],*/
    loadChildren: 'app/user/user.module#UserModule'
  },

  {
    path: 'freelancer',
    /*canActivate: [OnlyLoggedinUserGuard],*/
    loadChildren: 'app/freelancer/freelancer.module#FreelancerModule'
  },
  // {
  //   path: 'page-not-found',
  //   loadChildren: 'app/not-found/not-found.module#NotFoundModule'
  // },
  { path: '**', redirectTo: 'page-not-found' }
];

export const AppRouter: ModuleWithProviders = RouterModule.forRoot(routes);
