import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';
import { UtilsService } from '../../providers/utils.service';
import { JobService } from "../../providers/job/job.service";
import { Observable } from 'rxjs';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';


@Component({
  selector: 'app-job-post-edit',
  templateUrl: './job-post-edit.component.html',
  styleUrls: ['./job-post-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobPostEditComponent implements OnInit {

  jobEdit: any;
  job: any;
  jobId: Number;
  alert: any;
  submitBtn: any;
  errors: any;
  photo: String;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _utils: UtilsService,
    private _jobService: JobService,
    private _toastyService: ToastyService,
    private _toastyConfig: ToastyConfig,
  ) {
    this._toastyConfig.theme = 'bootstrap';
  }

  photoFiles: any[] = [];
  photoUrl: string;
  onPhotoUpload(event) {
    console.log('event', event);
    this.photo = JSON.parse(event.xhr.response).data;
    console.log('this.photo', this.photo);
    this.photoUrl = "/server/data/jobpost" + this.photo;
    console.log('this.photo', this.photoUrl);
    console.log('event.files', event.files);
    if (event.files.length > 5) {
      console.log('event.files', event.files);
      console.log('event.files.length', event.files.length);
      var toastOptions: ToastOptions = {
        title: "Message",
        msg: "Only 5 Files are allowed to upload",
        showClose: true,
        timeout: 3000
      };
      this._toastyService.error(toastOptions);
    } else {
      console.log('event.files', event.files);
      for (let file of event.files) {
        console.log('file', file);
        this.photoFiles.push(file.name);
        console.log(this.photoFiles);
      }
    }
  }
  private getJobById() {
    this._jobService.getJobDetails(this.jobId)
      .subscribe((res: any) => {
        res.data.job_skills = res.data.job_skills.toString();
        this.jobEdit = res.data;
      })
  }
  deleteFile(attachments: any) {
    console.log(attachments);
    console.log(this.jobEdit.attachments);
    console.log(this.jobEdit.attachments.indexOf(attachments));
    const index: number = this.jobEdit.attachments.indexOf(attachments);
    console.log(index);
    if (index !== -1) {
      console.log(index)
      this.jobEdit.attachments.splice(index, 1);
      console.log(this.jobEdit.attachments);
    }
    console.log(this.jobEdit.attachments);
  }
  submit() {
    this.errors = [];
    let user_id = this._utils.userConstID;
    // console.log('this.photoFiles', this.photoFiles);
    // setTimeout(()=>{
    //   if (this.jobEdit.attachments.length == 0) {
    //     console.log('if this.jobEdit.attachments', this.jobEdit);
    //   }
    //   console.log('else this.jobEdit.attachments', this.jobEdit);
    // },0);
    console.log('attach', this.jobEdit.attachments);
    console.log('photo', this.photo);
    if (this.photo) {
      this.jobEdit.attachments = this.jobEdit.attachments.concat(this.photo);
    }
    console.log('after concat', this.jobEdit.attachments)
    this._jobService.editJobById(this.jobId, this.jobEdit)
      .subscribe((res: any) => {
        var toastOptions: ToastOptions = {
          title: "Message",
          msg: "Job was updated successfully.",
          showClose: true,
          timeout: 3000
        };
        this._toastyService.success(toastOptions);
      }, err => {
        let error = err.json();
        this.errors = error;
      })
    this.router.navigate(["/user/job/user_id/jobs"]);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.jobId = params['jobId'];
      this.getJobById();
    });
  }

}
