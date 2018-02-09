import { Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import _ from 'lodash';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthService {

  private apiURL: string = "user";
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private baseURL: string = "/user"
  constructor(
    public _utils: UtilsService,
    private _http: Http,
    private _cookieService: CookieService
  ) {
    this.apiURL = this._utils.apiURL + this.apiURL;
    this.baseURL = this._utils.baseURL + this.baseURL
  }

  userName() {
    let user: any = this._cookieService.get(`${this._utils.appName}_user`);
    user = JSON.parse(user);
    return `${user.first_name} ${user.last_name}`;
  }

  getAvatar() {
    let user: any = this._cookieService.get(`${this._utils.appName}_user`);
    user = JSON.parse(user);
    return `${user.avatar}`;
  }

  login(_url: string, _data: any) {
    return new Promise((resolve, reject) => {
      this._http.post(`${this.apiURL}/${_url}`, JSON.stringify(_data), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          this._cookieService.put(`${this._utils.appName}_logged_in`, 'true');
          this._cookieService.put(`${this._utils.appName}_token`, data.data.token);
          this._cookieService.putObject(`${this._utils.appName}_user`, data.data.user);
          resolve(data);
        },
        error => {
          reject(error.json());
        }
        );
    })
  }

  logout() {
    return new Promise((resolve, reject) => {
      this._http.get(this.apiURL + '/logout', { headers: this._utils.createHeaders() })
        .map(res => res.json())
        .subscribe(data => {
          this._cookieService.remove(`${this._utils.appName}_logged_in`);
          this._cookieService.remove(`${this._utils.appName}_token`);
          this._cookieService.remove(`${this._utils.appName}_user`);
          setTimeout(() => {
            resolve(data);
          }, 500)
        },
        error => {
          reject(error.json());
        }
        );
    })
  }

  resendActivation(_data: any) {
    return new Promise((resolve, reject) => {
      this._http.post(this.apiURL + '/resend-activation', JSON.stringify(_data), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error.json());
        }
        );
    })
  }

  verify(_uid: any, _token: any) {
    return new Promise((resolve, reject) => {
      let data = {
        uid: _uid,
        token: _token
      }
      this._http.post(this.apiURL + `/activate`, JSON.stringify(data), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error.json());
        }
        );
    })
  }


  acceptInvite(inviteUrl: string): any {
    var inviteUrl = this._utils.backURL + inviteUrl
    return new Promise((resolve, reject) => {
      this._http.get(`${inviteUrl}`, { headers: this._utils.createHeaders() })
        .map(data => data.json())
        .subscribe(data => {
          console.log('invite accepted new reg user:::');
          resolve(data);
        },
        error => {
          reject('some error happened');
        }
        );
    });
  }


  signUp(_data: any) {
    return new Promise((resolve, reject) => {
      console.log("signUp url::", this.apiURL + '/register')
      this._http.post(this.apiURL + '/register', JSON.stringify(_data), { headers: this.headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
        }
        );
    })
  }

}
