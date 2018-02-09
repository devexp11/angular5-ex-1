import { Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Headers, Http } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import _ from 'lodash';

@Injectable()
export class UserService {

  private apiURL: string = "user/getallusers";
  private apiGetUsersPagedURL = "user/getUsersPaged";
  private apiGetUsersPagedCountURL = "user/getUsersPagedCount";
  private apiGetFreelancersPagedURL = "user/getFreelancersPaged";
  private apiGetFreelancersPagedCountURL = "user/getFreelancersPagedCount";
  private apiFindFreelancersURL = "user/findFreelancers";
  private apiURL_Logs: string = "/timelogs";
  private result: boolean;
  private apiLocalLogsURL: string;
  private apiLogsFilteredURL: string;
  private apiLogsFilteredCountURL: string;
  private apiTeamGetByIDRelURL: string = "/user/team/getTeamByUserId";
  private apiTeamGetByIDURL: string;
  private apiTeamAddEmployee: string = "/user/add";
  constructor(
    public _utils: UtilsService,
    private _http: Http
  ) {
    this.apiURL = this._utils.apiURL + this.apiURL;
    this.apiURL_Logs = this._utils.apiURL + this.apiURL_Logs;
    this.apiLocalLogsURL = this._utils.backURL + '/user/log/getImages';
    this.apiLogsFilteredURL = this._utils.backURL + '/user/log/getImagesPaged';
    this.apiLogsFilteredCountURL = this._utils.backURL + '/user/log/getImagesPagedCount';
    this.apiGetUsersPagedURL = this._utils.apiURL + this.apiGetUsersPagedURL;
    this.apiGetUsersPagedCountURL = this._utils.apiURL + this.apiGetUsersPagedCountURL;
    this.apiGetFreelancersPagedURL = this._utils.apiURL + this.apiGetFreelancersPagedURL;
    this.apiGetFreelancersPagedCountURL = this._utils.apiURL + this.apiGetFreelancersPagedCountURL;
    this.apiFindFreelancersURL = this._utils.apiURL + this.apiFindFreelancersURL
    this.apiURL_Logs = 'user/log/getImages';
    this.apiURL_Logs = this._utils.apiURL + this.apiURL_Logs;
    this.apiTeamGetByIDURL = this._utils.backURL + this.apiTeamGetByIDRelURL;
  }
  getFreelancers(): Observable<any[]> {
    return this._http.post(this.apiURL, { headers: this._utils.createHeaders() })
    .map(res => {
        return res.json();
    });
  }

  getLogs(_userId: string): Observable<any[]> {
    return this._http.post(`${this.apiURL_Logs}/${_userId}`, {}, { headers: this._utils.createHeaders() })
    .map(res => {
        return res.json();
    });
  }

  getTeamEmployees(user_id): any {
    return new Promise((resolve, reject) => {
      this._http.get(this._utils.backURL+'/user/team/getTeamByUserId/'+user_id, { headers: this._utils.createHeaders() })
        .map(data => data.json())
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

  getEmail() {
    return this._http.post(this.apiURL, { headers: this._utils.createHeaders() })
    .toPromise()
    .then(res => <any[]> res.json().data)
    .then(data => { return data; });
}

  getLogsByID(_userID: number): any {

    let data: any = {};
    data.user_id = _userID;

    return new Promise((resolve, reject) => {
      this._http.post(this.apiLocalLogsURL,{data}, { headers: this._utils.createHeaders() })
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

  getLogsFiltered(_userID: number, _limit:number , _skip: number, range_start, range_end): any {

    let data: any = {};
    data.user_id = _userID;
    data.range_start = range_start;
    data.range_end = range_end;
    data.limit = _limit;
    data.skip = _skip;
    return new Promise((resolve, reject) => {
      this._http.post(this.apiLogsFilteredURL,{data}, { headers: this._utils.createHeaders() })
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

  getImagesPagedCount(_userID: number, range_start,range_end): any {

      let data: any = {};
      data.user_id = _userID;
      data.range_start = range_start;
      data.range_end = range_end;

      return new Promise((resolve, reject) => {
        this._http.post(this.apiLogsFilteredCountURL,{data}, { headers: this._utils.createHeaders() })
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
 getUsersPaged(_limit:number , _skip: number): any {
    let data: any = {};
    data.limit = _limit;
    data.skip = _skip;
    return new Promise((resolve, reject) => {
      this._http.post(this.apiGetUsersPagedURL,{data}, { headers: this._utils.createHeaders() })
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

//add search andsort
 getUsersPagedCount(): any {
      var data = {};
      return new Promise((resolve, reject) => {
        this._http.post(this.apiGetFreelancersPagedCountURL,{data}, { headers: this._utils.createHeaders() })
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


    getFreelancersPaged(_limit:number , _skip: number): any {
    let data: any = {};
    data.limit = _limit;
    data.skip = _skip;
    return new Promise((resolve, reject) => {
      this._http.post(this.apiGetFreelancersPagedURL,{data}, { headers: this._utils.createHeaders() })
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

//add search andsort
 getFreelancersPagedCount(): any {
      var data : any = {};
      return new Promise((resolve, reject) => {
        this._http.post(this.apiGetFreelancersPagedCountURL,{data}, { headers: this._utils.createHeaders() })
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

//add search andsort
 findFreelancers(find_text): any {
      var data : any = {};
      data.find_text = find_text
      return new Promise((resolve, reject) => {
        this._http.post(this.apiFindFreelancersURL,{data}, { headers: this._utils.createHeaders() })
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

  addEmployee(apiUrl: string, data: any) : any {
    return new Promise((resolve, reject) => {
      this._http.post(`${apiUrl}`, data, { headers: this._utils.createHeaders() })
        .map(data => data.json())
        .subscribe(data => {
          if(data.success) {
            resolve(data);
          }
          else {
            reject(data);
          }
        },
        error => {
          reject('some error happened');
        }
      );
    });
  }

  getPendingInvitations(apiUrl: string, userId: number): any {
    let data:any = {}; 
    data.user_id = userId;

    return new Promise((resolve, reject) => {
      this._http.post(`${apiUrl}`, data, { headers: this._utils.createHeaders() })
        .map(data => data.json())
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject('some error happened');
        }
      );
    });
  }

 
}
