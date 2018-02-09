import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';
import { JobService } from "../../providers/job/job.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'user-job-freelancers',
  templateUrl: './job-freelancers.component.html',
  styleUrls: ['./job-freelancers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobFreelancersComponent implements OnInit {

  jobFreelancers: any;
  job: any;
  jobId: string;
  modal: any;
  alert: any;
  submitBtn: any;
  errors: any;
  freelancerEmail: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _jobService: JobService,
    private _modalService: NgbModal,
    private _toastyService: ToastyService,
    private _toastyConfig: ToastyConfig,
  ) { }

  private getJobFreelancers() {
    this._jobService.getJobFreelancers(this.jobId)
    .subscribe((res:any) => {
      if(!this.job)
        this.job = res.job;
      this.jobFreelancers = res.data.freelancers;
    })
  }

  private reset() {
    this.freelancerEmail = '';
    this.alert = {
      type: null,
      message: null
    };
    this.submitBtn = {
      isLoading: false,
      caption: 'Submit'
    };
  }

  freelancerForm(_content) {
    this.reset();
    this.modal = this._modalService.open(_content);
  }

  submit() {
    if (!this.submitBtn.isLoading) {
      this.errors = [];
      this.alert.type = null;
      this.submitBtn.isLoading = true;
      this.submitBtn.caption = 'Please wait...';
      this._jobService.addFreelancer(this.jobId, {email: this.freelancerEmail})
        .subscribe(res => {
          var toastOptions: ToastOptions = {
            title: "Message",
            msg: "Freelancer was added to job successfully.",
            showClose: true,
            timeout: 3000
          };
          this._toastyService.success(toastOptions);
          this.getJobFreelancers();
          this.modal.close();
        }, err => {
          let error = err.json();
          console.log(error)
          this.submitBtn.isLoading = false;
          this.submitBtn.caption = 'Submit';
          this.alert.type = 'danger';
          this.alert.message = error.message;
        })
    }
  }

  ngOnInit() {
    this.reset();
    this._toastyConfig.theme = 'bootstrap';
    this.activatedRoute.params.subscribe((params: Params) => {
        this.jobId = params['jobId'];
        this.getJobFreelancers();
      });
  }

}
