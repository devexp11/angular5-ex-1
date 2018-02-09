import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreelancerComponent } from './freelancer.component';
import { ReportsComponent } from './reports/reports.component';
import { TimelineComponent } from './timeline/timeline.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobPostsComponent } from './job-posts/job-posts.component';
import { JobTasksComponent } from './job-tasks/job-tasks.component';
import { JobsComponent } from './jobs/jobs.component';
import { MessengerComponent } from './messenger/messenger.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {
    path: '',
    component: FreelancerComponent,
    children: [
      { path: 'reports', component: ReportsComponent },
      { path: 'timeline', component: TimelineComponent},
      { path: 'job/:jobId/details', component: JobDetailsComponent},
      { path: 'task', component: JobTasksComponent},
      { path: 'jobpost', component: JobPostsComponent },
      { path: 'job/:userId/jobs', component: JobsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'messenger', component: MessengerComponent },
      { path: 'project/:userId/projects', component: ProjectsComponent },
      { path: '**', redirectTo: 'report' }
    ]
  }
];

export const FreelancerRouter: ModuleWithProviders = RouterModule.forChild(routes);
