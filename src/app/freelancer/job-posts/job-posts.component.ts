import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JobService } from "../../providers/job/job.service";
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { FileUploadModule } from 'primeng/primeng';
import { UtilsService } from '../../providers/utils.service';
import { CookieService } from 'ngx-cookie';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';

@Component({
  selector: 'freelancer-job-posts',
  templateUrl: './job-posts.component.html',
  styleUrls: ['./job-posts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobPostsComponent implements OnInit {

  photo: String;
  userJobs: Observable<any[]>;
  job: any;
  modal: any;
  submitBtn: any;
  errors: any;

  constructor(
    private router:Router,
    public _jobService: JobService,
    private _toastyService: ToastyService,
    private _toastyConfig: ToastyConfig,
    public _utils: UtilsService,
    private _cookieService: CookieService,
  ) {
    this.resetJob();
    this._toastyConfig.theme = 'bootstrap';
  }

  photoFiles: any[] = [];
  photoUrl: string;
  onPhotoUpload(event) {
    console.log('event',event);
    this.photo = JSON.parse(event.xhr.response).data;
    console.log('this.photo',this.photo);
    this.photoUrl = "/server/data/jobpost" + this.photo;
    console.log('this.photo',this.photoUrl);
    console.log('event.files',event.files);
    if (event.files.length > 5) {
      console.log('event.files',event.files);
      console.log('event.files.length',event.files.length);
      var toastOptions: ToastOptions = {
        title: "Message",
        msg: "Only 5 Files are allowed to upload",
        showClose: true,
        timeout: 3000
      };
      this._toastyService.error(toastOptions);
    } else {
      console.log('event.files',event.files);
      for (let file of event.files) {
        console.log('file',file);
        this.photoFiles.push(file.name);
        console.log(this.photoFiles);
      }
    }
  }

  private resetJob() {
    this.job = {
      name: '',
      description: '',
      rate_per_hour: ''
    };
    this.submitBtn = {
      isLoading: false,
      caption: 'Submit'
    };
  }

  submit() {
    if (!this.submitBtn.isLoading) {
      this.errors = [];
      this.submitBtn.isLoading = true;
      this.submitBtn.caption = 'Please wait...';
      this.job.attachments = this.photo;
      console.log(this.job.attachments);
      this._jobService.postJob(this.job)
        .subscribe(res => {
          var toastOptions: ToastOptions = {
            title: "Message",
            msg: "Job was created successfully.",
            showClose: true,
            timeout: 3000
          };
          this._toastyService.success(toastOptions);
        }, err => {
          let error = err.json();
          this.submitBtn.isLoading = false;
          this.submitBtn.caption = 'Submit';
          this.errors = error;
        })
    }
    let user_id = this._utils.userConstID;
    this.router.navigate(["/freelancer/job/user_id/jobs"]);
    // window.location.href = "/user/job/user_id/jobs"
  }

  ngOnInit() {
    this.job.rate_per_hour = 1;
  }

}
