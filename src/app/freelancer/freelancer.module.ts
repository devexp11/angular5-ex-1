import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FreelancerRouter } from './freelancer.router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ToastyModule } from 'ng2-toasty';

import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { AutoCompleteModule, TabViewModule, FileUploadModule, PaginatorModule } from 'primeng/primeng';
import { ReportsComponent } from './reports/reports.component';
import { TabsModule } from 'ngx-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { FreelancerComponent } from './freelancer.component';
import { TimelineComponent } from './timeline/timeline.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobPostsComponent } from './job-posts/job-posts.component';
import { JobTasksComponent } from './job-tasks/job-tasks.component';
import { JobsComponent } from './jobs/jobs.component';
import { MessengerComponent } from './messenger/messenger.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserService } from '../providers/user/user.service';
import { ProjectService } from '../providers/project/project.service';
import { JobService } from '../providers/job/job.service';


@NgModule({
  imports: [
    LazyLoadImageModule,
    HttpModule,
    FormsModule,
    RouterModule,
    NgbModule,
    CommonModule,
    FreelancerRouter,
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
    MenuComponent,
    HeaderComponent,
    ReportsComponent,
    FreelancerComponent,
    TimelineComponent,
    JobDetailsComponent,
    JobPostsComponent,
    JobsComponent,
    JobTasksComponent,
    MessengerComponent,
    ProfileComponent,
    ProjectsComponent
  ],
  providers: [
    UserService,
    ProjectService,
    JobService
  ]
})
export class FreelancerModule { }
