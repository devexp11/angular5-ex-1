import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { ListComponent } from './list/list.component';
import { UserLogsComponent } from './user-logs/user-logs.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobTasksComponent } from './job-tasks/job-tasks.component';
import { JobFreelancersComponent } from './job-freelancers/job-freelancers.component';
import { TeamComponent } from './team/team.component';
import { FreelancersComponent } from './freelancers/freelancers.component';
import { FreelancersProfileComponent } from './freelancers-profile/freelancers-profile.component';
import { FreelancersMessengerComponent } from './freelancers-messenger/freelancers-messenger.component';
import { ReportsComponent } from './reports/reports.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { JobPostsComponent } from './job-posts/job-posts.component';
import { MyProjectsCreateComponent } from './my-projects-create/my-projects-create.component';
import { FreelancersContractComponent } from './freelancers-contract/freelancers-contract.component';
import { InviteFreelancersComponent } from './invite-freelancers/invite-freelancers.component';
import { JobPostEditComponent } from './job-post-edit/job-post-edit.component';
import { TeamListResolve } from '../shared/route_resolve/teamList';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // { path: 'alljobs', component: JobsComponent },
      { path: 'job/:userId/jobs', component: JobsComponent },
      // { path: 'job/:jobId/tasks', component: JobTasksComponent },
      { path: 'task', component: JobTasksComponent },
      { path: 'project/:userId/projects', component: MyProjectsComponent },
      { path: 'myproject/createproject', component: MyProjectsCreateComponent },
      { path: 'jobpost', component: JobPostsComponent },
      { path: 'job/:jobId/freelancers', component: JobFreelancersComponent },
      { path: 'job/:jobId/details', component: JobDetailsComponent },
      { path: 'job/:jobId/edit', component: JobPostEditComponent },
      { path: 'job/editJobById/:jobId', component: JobPostEditComponent },
      { path: 'project/details', component: JobDetailsComponent },
      { path: 'list', component: ListComponent },
      { path: 'logs/:userId', component: UserLogsComponent },
      { path: 'logs', component: UserLogsComponent },
      { path: 'freelancers', component: FreelancersComponent },
      { path: 'freelancers/profile', component: FreelancersProfileComponent },
      { path: 'freelancers/messenger', component: FreelancersMessengerComponent },
      { path: 'contract', component: FreelancersContractComponent },
      { path: 'invite', component: InviteFreelancersComponent },
      { path: 'messenger', component: FreelancersMessengerComponent },
      { path: 'reports', component: ReportsComponent },
      { 
        path: 'team',
        component: TeamComponent,
        resolve:{
          teamList : TeamListResolve
        }

      },
      { path: '**', redirectTo: 'team' }
    ]
  }
];

export const UserRouter: ModuleWithProviders = RouterModule.forChild(routes);
