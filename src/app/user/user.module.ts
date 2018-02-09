import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRouter } from './user.router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ToastyModule } from 'ng2-toasty';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user.component';
import { ProjectsComponent } from './projects/projects.component';
import { ListComponent } from './list/list.component';
import { MenuComponent } from './menu/menu.component';
import { UserService } from '../providers/user/user.service';
import { ProjectService } from '../providers/project/project.service';
import { UserLogsComponent } from './user-logs/user-logs.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobService } from '../providers/job/job.service';
import { JobTasksComponent } from './job-tasks/job-tasks.component';
import { JobFreelancersComponent } from './job-freelancers/job-freelancers.component';
import { TeamComponent } from './team/team.component';
import { HeaderComponent } from './header/header.component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { AutoCompleteModule, TabViewModule, FileUploadModule, PaginatorModule } from 'primeng/primeng';
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
import { TabsModule } from 'ngx-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { JobPostEditComponent } from './job-post-edit/job-post-edit.component';
import { TeamListResolve } from '../shared/route_resolve/teamList';

@NgModule({
  imports: [
    LazyLoadImageModule,
    HttpModule,
    FormsModule,
    RouterModule,
    NgbModule,
    CommonModule,
    UserRouter,
    NgxDnDModule,
    AutoCompleteModule,
    TabViewModule,
    FileUploadModule,
    PaginatorModule,
    MultiselectDropdownModule,
    TabsModule.forRoot(),
    ToastyModule.forRoot(),
    MalihuScrollbarModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    ProjectsComponent,
    ListComponent,
    MenuComponent,
    UserLogsComponent,
    JobsComponent,
    JobTasksComponent,
    JobFreelancersComponent,
    TeamComponent,
    HeaderComponent,
    FreelancersComponent,
    FreelancersProfileComponent,
    FreelancersMessengerComponent,
    ReportsComponent,
    JobDetailsComponent,
    MyProjectsComponent,
    JobPostsComponent,
    MyProjectsCreateComponent,
    FreelancersContractComponent,
    InviteFreelancersComponent,
    JobPostEditComponent,
  ],
  providers: [
    TeamListResolve,
    UserService,
    ProjectService,
    JobService
  ]
})
export class UserModule { }
