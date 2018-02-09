import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JobService } from "../../providers/job/job.service";
import { Observable } from 'rxjs';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';
import { UtilsService } from '../../providers/utils.service';

@Component({
  selector: 'user-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobDetailsComponent implements OnInit {

  jobDetails: any;
  job: any;
  jobId: Number;
  alert: any;
  submitBtn: any;
  errors: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _utils: UtilsService,
    private _jobService: JobService,
    private _toastyService: ToastyService,
    private _toastyConfig: ToastyConfig,
  ) {  }

  private getJobDetails() {
    this._jobService.getJobDetails(this.jobId)
    .subscribe((res:any) => {
        this.jobDetails = res.data;
    })
  }

  ngOnInit() {
    this._toastyConfig.theme = 'bootstrap';
    this.activatedRoute.params.subscribe((params: Params) => {
      this.jobId = params['jobId'];
      this.getJobDetails();
    });
  }

}
