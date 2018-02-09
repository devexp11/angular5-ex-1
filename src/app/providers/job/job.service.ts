import { Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import 'rxjs/add/operator/map';
import _ from 'lodash';

@Injectable()
export class JobService {

  private apiURL: string = "job";
  private apiGetSimpleJobsPagedURL: string = "job/simpleJobsPaged"
  private jobTaskURL: string = "task";
  private apiGetUserJobsPaged = "job/getAllJobsForUserPaged";
  private apiGetUserJobsPagedCount = "job/getAllJobsForUserCount";
  private apiGetAllJobsPaged = "job/getAllJobsPaged";
  private apiGetAllJobsPagedCount = "job/getAllJobsCount";
  private apiLoadTasksForJob = "job/loadTasksForJob"
  constructor(
    public _utils: UtilsService,
    private _cookieService: CookieService,
    private _http: Http
  ) {
    this.apiURL = this._utils.apiURL + this.apiURL;
    this.jobTaskURL = this._utils.apiURL + this.jobTaskURL;
    this.apiGetUserJobsPaged = this._utils.apiURL + this.apiGetUserJobsPaged;
    this.apiGetUserJobsPagedCount = this._utils.apiURL + this.apiGetUserJobsPagedCount;

    this.apiGetAllJobsPaged = this._utils.apiURL + this.apiGetAllJobsPaged;
    this.apiGetAllJobsPagedCount = this._utils.apiURL + this.apiGetAllJobsPagedCount;
    this.apiLoadTasksForJob = this._utils.apiURL + this.apiLoadTasksForJob;
  }

  getJobsByUserId(): Observable<any[]> {
    let user: any = this._cookieService.get(`${this._utils.appName}_user`);

    user = JSON.parse(user)
    let user_id = user._id
    return this._http.get(`${this.apiURL}/${user_id}/jobs`, { headers: this._utils.createHeaders() })
      .map(res => {
        return res.json().data;
      });
  }

  getAllJobs(): Observable<any[]> {
    return this._http.get(`${this.apiURL}/jobs`, { headers: this._utils.createHeaders() })
      .map(res => {
        return res.json().data;
      });
  }
  
   getSimpleJobsPaged(_limit: number, _skip: number, _init_load): any {

    let user: any = this._cookieService.get(`${this._utils.appName}_user`);
    user = JSON.parse(user)
    let user_id = user._id;

    let data : any = {};
    data.limit = _limit;
    data.skip = _skip;
    data.user_id = user_id;
    data.init_load = _init_load
    
    return this._http.post(this.apiGetUserJobsPaged,{data}, { headers: this._utils.createHeaders() });
  }


   loadTasksForJob(load_start: number, load_end: number, job_id : number): any {

  
    let data : any = {};
   
    data.job_id = job_id;
    data.load_start = load_start;
    data.load_end = load_end
    
    return this._http.post(this.apiLoadTasksForJob,{data}, { headers: this._utils.createHeaders() });
  }


  //add search and sort
   getUserJobsPaged(_limit:number , _skip: number): any {
      let user: any = this._cookieService.get(`${this._utils.appName}_user`);
      user = JSON.parse(user)
      let user_id = user._id;

      let data: any = {};
      data.limit = _limit;
      data.skip = _skip;
      data.user_id = user_id;
      return  this._http.post(this.apiGetUserJobsPaged,{data}, { headers: this._utils.createHeaders() })
           .map(res => {
        return res.json().data;
      });
    }

 //add search andsort
   getUserJobsPagedCount(): any {
      let user: any = this._cookieService.get(`${this._utils.appName}_user`);
      user = JSON.parse(user)
      let user_id = user._id;
      
        return new Promise((resolve, reject) => {
          this._http.get(`${this.apiGetUserJobsPagedCount}/${user_id}`, { headers: this._utils.createHeaders() })
            .map(d => d.json())
            .subscribe(data => {
              if(data) {
                resolve(data);
              }
              else {
                reject('data success is false');
              }
            },
            error => {
              reject('some error happened');
            }
          );
        });
      }

  //add search and sort
   getAllJobsPaged(_limit:number , _skip: number): any {

      let data: any = {};
      data.limit = _limit;
      data.skip = _skip;
      return  this._http.post(this.apiGetAllJobsPaged,{data}, { headers: this._utils.createHeaders() })
           .map(res => {
        return res.json().data;
      });
    }

  //add search andsort
   getAllJobsPagedCount(): any {
      let user: any = this._cookieService.get(`${this._utils.appName}_user`);
      user = JSON.parse(user)
      let user_id = user._id;
      
        return new Promise((resolve, reject) => {
          this._http.get(this.apiGetAllJobsPagedCount, { headers: this._utils.createHeaders() })
            .map(d => d.json())
            .subscribe(data => {
              if(data) {
                resolve(data);
              }
              else {
                reject('data success is false');
              }
            },
            error => {
              reject('some error happened');
            }
          );
        });
      }

 

  getSimpleJobs() {
    let user: any = this._cookieService.get(`${this._utils.appName}_user`);

    user = JSON.parse(user)
    let user_id = user._id
    return this._http.get(`${this.apiURL}/${user_id}/jobs`, { headers: this._utils.createHeaders() });
  }

 

  getJobTasks(_jobId: string): Observable<any[]> {

    return this._http.get(`${this.jobTaskURL}/${_jobId}/tasks`, { headers: this._utils.createHeaders() })
      .map(res => {
        let result: any;
        result = { job: null, tasks: res.json().data }
        return result;
      });
  }

  getJobDetails(_jobId: Number): Observable<any[]> {
    return this._http.get(`${this.apiURL}/${_jobId}/details`, { headers: this._utils.createHeaders() })
      .map(res => {
        return res.json();
      });
  }

  getJobFreelancers(_jobId: string): Observable<any[]> {
    return this._http.get(`${this.apiURL}/${_jobId}/getfreelancer`, { headers: this._utils.createHeaders() })
      .map(res => {
        return res.json();
      });
  }

  addFreelancer(_jobId: string, _data: any) {
    return this._http.post(`${this.apiURL}/${_jobId}/invitefreelancer`, JSON.stringify(_data), { headers: this._utils.createHeaders() })
      .map(res => {
        return res.json();
      });
  }

  postJob(_data: any) {
    console.log('in post job');
    console.log(_data);
    let user: any = this._cookieService.get(`${this._utils.appName}_user`);
    user = JSON.parse(user)
    _data.user_id = user._id
    return this._http.post(`${this.apiURL}/postjob`, JSON.stringify(_data), { headers: this._utils.createHeaders() })
      .map(res => {
        return res.json();
      });
  }

  getJobById(_jobId: Number){
    return this._http.get(`${this.apiURL}/${_jobId}/edit`, { headers: this._utils.createHeaders() })
      .map(res => {
        return res.json();
      });
  }

  editJobById(_jobId: Number, job: any) {
    console.log('in update job');
    console.log('job', job);
    let _data = {
      _id: _jobId, 
      user_id: job.user_id,
      name: job.name,
      rate_per_hour: job.rate_per_hour,
      description: job.description,
      attachments: job.attachments,
      commitment: job.commitment,
      experience: job.experience,
      freelancers: job.freelancers,
      job_last: job.job_last,
      job_skills: job.job_skills,
      job_type: job.job_type,
      pay_method: job.pay_method,
      questions: job.questions
    }
    return this._http.put(`${this.apiURL}/editJobById/` + _jobId, JSON.stringify(_data), { headers: this._utils.createHeaders() })
      .map(res => {
        console.log('res',res);
        return res.json().data;
      });
  }

  updateTask(_taskId: Number, _order: Number) {
    let _data = {
      _id: _taskId,
      display_order: _order
    }
    return this._http.post(`${this.jobTaskURL}/updatetask`, JSON.stringify(_data), { headers: this._utils.createHeaders() })
      .map(res => {
        return res.json().data;
      });
  }

  postTask(_jobId: string, _data: any) {
    _data.job_id = _jobId
    return this._http.post(`${this.jobTaskURL}/createtask`, JSON.stringify(_data), { headers: this._utils.createHeaders() })
      .map(res => {
        return res.json().data;
      });
  }

}