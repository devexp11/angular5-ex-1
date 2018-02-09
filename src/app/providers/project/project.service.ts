import { Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import 'rxjs/add/operator/map';
import _ from 'lodash';

@Injectable()
export class ProjectService {

  private apiURL: string = "project";
  private apiGetUserProjectsPaged = "project/getUsersProjectsPaged";
  private apiGetUserProjectsPagedCount = "project/getUsersProjectsPagedCount";

  constructor(
    public _utils: UtilsService,
    private _cookieService: CookieService,
    private _http: Http
  ) {
    this.apiURL = this._utils.apiURL + this.apiURL;
    this.apiGetUserProjectsPaged = this._utils.apiURL + this.apiGetUserProjectsPaged;
    this.apiGetUserProjectsPagedCount = this._utils.apiURL + this.apiGetUserProjectsPagedCount
  }

  createProject(_data: any) {
    let user: any = this._cookieService.get(`${this._utils.appName}_user`);
    user = JSON.parse(user)
    _data.user_id = user._id
    return this._http.post(`${this.apiURL}/createProject`, JSON.stringify(_data), { headers: this._utils.createHeaders() })
      .map(res => {
        return res.json();
      });
  }

  getProjectsByUserId(): any {
    let user: any = this._cookieService.get(`${this._utils.appName}_user`);
    user = JSON.parse(user);
    let user_id = user._id;
    return this._http.get(`${this.apiURL}/${user_id}/projects`, { headers: this._utils.createHeaders() });
  }

  getProjects(): Observable<any[]> {
    return this._http.get(this.apiURL, { headers: this._utils.createHeaders() })
      .map(res => {
        return res.json();
      });
  }


  getUsersProjectsPaged(_limit: number, _skip: number): any {
    let user: any = this._cookieService.get(`${this._utils.appName}_user`);
      user = JSON.parse(user)
      let user_id = user._id;

      let data: any = {};
      data.limit = _limit;
      data.skip = _skip;
      data.user_id = user_id;
      return  this._http.post(this.apiGetUserProjectsPaged,{data}, { headers: this._utils.createHeaders() })
           
  }

  //add search and sort
   getUsersProjectsPagedCount(): any {
      let user: any = this._cookieService.get(`${this._utils.appName}_user`);
      user = JSON.parse(user)
      let user_id = user._id;

       return new Promise((resolve, reject) => {
          this._http.get(`${this.apiGetUserProjectsPagedCount}/${user_id}`, { headers: this._utils.createHeaders() })
            .map(d => d.json())
            .subscribe(data => {
              console.log(data,"jjjj")
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

}
