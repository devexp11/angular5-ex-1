import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../providers/project/project.service";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { UtilsService } from '../../providers/utils.service';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-projects-create',
  templateUrl: './my-projects-create.component.html',
  styleUrls: ['./my-projects-create.component.scss']
})
export class MyProjectsCreateComponent implements OnInit {

  project: any;
  submitBtn: any;
  errors: any;
  equity: boolean;
  token: boolean;

  constructor(
    public _projectService: ProjectService,
    private _toastyService: ToastyService,
    private _toastyConfig: ToastyConfig,
    public _utils: UtilsService,
    private _cookieService: CookieService,
  ) { 
    this.resetProject();
    this._toastyConfig.theme = 'bootstrap';
  }

  private resetProject() {
    this.project = {
      name: '',
      description: '',
    };
    this.submitBtn = {
      isLoading: false,
      caption: 'Submit'
    };
  }

  project_type(proj_type){
    if(proj_type == 'TOKEN'){
      this.token = true;
      this.equity = false;
    }
    else if(proj_type == 'EQUITY'){
      this.equity = true;
      this.token = false;
    }
    else if(proj_type == 'DEBT'){
      this.equity = false;
      this.token = false;
    }
  }
  submit() {
    if (!this.submitBtn.isLoading) {
      this.errors = [];
      this.submitBtn.isLoading = true;
      this.submitBtn.caption = 'Please wait...';
      this._projectService.createProject(this.project)
        .subscribe(res => {
          var toastOptions: ToastOptions = {
            title: "Message",
            msg: "Project was created successfully.",
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
    window.location.href = "/user/project/user_id/projects"
  }

  ngOnInit() {
  }

}
