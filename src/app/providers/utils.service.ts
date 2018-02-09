import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { Headers } from '@angular/http';

@Injectable()
export class UtilsService {

  app: string = "Token Teams";
  appName: string = this.app.replace(" ","");
  apiURL: string = `${environment.baseURL}/api/`;
  baseURL: string = environment.baseURL;
    backURL: string = 'http://localhost:3000';
  userConstID: number;
  constructor(
    private _cookieService: CookieService
  ) {

    this.userConstID = this.userId()
  }

  ngOnInit() {

  }

  isLoggedIn() {
    return this._cookieService.get(`${this.appName}_logged_in`) == 'true';
  }

  isProjectOwner() {
    let user = this.user();
    return user.is_project_owner;
  }

  createHeaders() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + this._cookieService.get(`${this.appName}_token`));
    return headers;
  }

  createHeadersFromData() {
    // let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this._cookieService.get(`${this.appName}_token`));
    return headers;
  }

  userId() {

    let user:any = this._cookieService.get(`${this.appName}_user`);
    if(user == '' || user == undefined){
     return null;
    }
    else
    {
      user = JSON.parse(user);
    }
    return user._id;
  }

  user() {
    let user:any = this._cookieService.get(`${this.appName}_user`);
    return JSON.parse(user);
  }

}
