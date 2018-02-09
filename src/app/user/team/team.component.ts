import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Headers, Http } from '@angular/http';
import { UserService } from "../../providers/user/user.service";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { UtilsService } from '../../providers/utils.service';
import { CookieService } from 'ngx-cookie';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  emailInput: string;
  modal: any;
  teamList: any[] = [];
  pending: any[] = [];
  pendingInvitations: any[] = [];
  filteredEmailMultiple: any[];
  user: string;
  users: any[] = [];
  lastQuery: string = ""
  teamListR;

  private apiAddUserToTeamUrl: string;
  private apiGetTeamUsersUrl: string;
  private apiGetTeamPendingInvitationsUrl: string;
  imagePreviewURL: string = '';
  private apiUrl: string;

  toastOptions: ToastOptions;

  constructor(
    private _modalService: NgbModal,
    private _http: Http,
    public _utils: UtilsService,
    private _userService: UserService,
    private toastyService: ToastyService,
    private _cookieService: CookieService,
    private route: ActivatedRoute,
  ) {
    //this.apiURL = this._utils.apiURL + this.apiURL; uncomment later
    this.apiAddUserToTeamUrl = _utils.backURL + '/user/team/add';
    this.apiGetTeamUsersUrl = _utils.backURL + '/user/team/get';
    this.apiGetTeamPendingInvitationsUrl = _utils.backURL + '/user/team/teamInvitation/getInvitationsById';
    this.teamListR = this.route.snapshot.data['teamList'];
    this.toastOptions = {
      title: "",
      msg: "",
      showClose: true,
      timeout: 1500,
      theme: 'bootstrap',
      onAdd: (toast: ToastData) => {
      },
      onRemove: function (toast: ToastData) {
      }
    };
  }

  filterEmail(query, users: any[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      if (user.email.indexOf(query) == 0) {
        filtered.push(user);
      }
    }
    return filtered;
  }

  filterEmailMultiple(event) {
    let query = event.query;
    this._userService.getEmail().then(users => {
      this.filteredEmailMultiple = this.filterEmail(query, users);
      if (!this.filteredEmailMultiple.length) {
        if (this.validateEmail(query)) {
          this.filteredEmailMultiple.push({ "email": query, "new_user": true });
        }
      }
    });
    this.lastQuery = ""
  }


  ngOnInit() {
    this.getTeamEmployees();
    // this.getPendingInvitations();
    this._cookieService.get(`${this._utils.appName}_user`);
  }

  addEmployeeForm(_content): void {
    this.modal = this._modalService.open(_content);
  }

  closeEmployeeModal(): void {
    this.modal.close();
    this.users = [];
  }

  private validateEmail(email: string): boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  viewImage(_content, _image): void {
    this.imagePreviewURL = _image;
    this._modalService.open(_content, { size: 'lg' }).result
      .then((result) => {
        console.log(result);
      }, (reason) => {
        console.log(reason);
      });
  }

  inviteEmployee(): void {
    if (this.lastQuery != "") {
      if (!this.users.length) {
        this.users.push({ "email": this.lastQuery })
      }
      for (let i = 0; i < this.users.length; i++) {

        if (this.users[i].email != this.lastQuery) {
          this.users.push({ "email": this.lastQuery, "new_user": true })
        }

      }
    }
    let data: any = {};
    for (let i = 0; i < this.users.length; i++) {
      let user = this.users[i];
      if (user.email) {
        // data.push(user);
        data.email = user.email;
        data.user_id = this._utils.userConstID;
        if ((!user.email)) {
          let toastOptions2: ToastOptions = this.toastOptions;
          toastOptions2.title = 'Validation error';
          toastOptions2.msg = 'Inputed email is not correct or empty';
          this.toastyService.error(toastOptions2);
        } else {
          this.toastOptions.title = 'Success';
          this.toastOptions.msg = 'Users added';
          this._userService.addEmployee(this.apiAddUserToTeamUrl, data)
            .then((data) => {
              this.modal.close();
              this.emailInput = '';
              if (data.message)
                this.toastOptions.msg = data.message;
                this.toastyService.success(this.toastOptions);
                this.getTeamEmployees();
                // this.getPendingInvitations();
              })
            .catch((data) => {
              if (data) {
                this.toastOptions.title = 'Error';
                if (!data.message) {
                  this.toastOptions.msg = 'Some error happened for this request!';
                  this.toastyService.error(this.toastOptions);
                  return;
                }

                this.toastOptions.msg = data.message;
                this.toastyService.error(this.toastOptions);
              }
            });
        }
      }
    }
    this.users = [];
    this.lastQuery = ""
  }

  gethoures(d){
    d = Number(d);
   var diffMs = Number(d);

      if(d == 0 || !d ){
        return "00:00"
      }else{
        var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        // var h = Math.floor(d / 3600);
        // var m = Math.floor(d % 3600 / 60);
        // var s = Math.floor(d % 3600 % 60);
        // console.log( d)
        // console.log( h+":"+m)
     return diffHrs+":"+diffMins
      }
   
  }

  getTeamEmployees(): void {
    let data: any = {};
    // data.user_id = this._utils.userConstID;
    let user_id = this._utils.userConstID;
    this._userService.getTeamEmployees(user_id)
      .then((data) => {
        //Accepted List        
        this.teamList = data.data.accepted;
        for (let i = 0; i < this.teamList.length; i++) {
          this.teamList[i].teamusers.last_log.sort(function (a, b) {
            a = new Date(a.log_date);
            b = new Date(b.log_date);
            return a > b ? -1 : a < b ? 1 : 0;
          });
          if (this.teamList[i].teamusers.last_log.length) {
            this.teamList[i].teamusers.last_log = this.teamList[i].teamusers.last_log[0];
          }
            this.teamList[i].teamusers.Today = this.gethoures(this.teamList[i].teamusers.Today);
            this.teamList[i].teamusers.Yesterday = this.gethoures(this.teamList[i].teamusers.Yesterday);
            this.teamList[i].teamusers.this_week = this.gethoures(this.teamList[i].teamusers.this_week);
            this.teamList[i].teamusers.this_month = this.gethoures(this.teamList[i].teamusers.this_month);

        }
        //Pending List
        this.pending = data.data.pending;
      })
      .catch((msg) => {
        console.log('team not found');
      });
  }

  getPendingInvitations(): any {
    let user: any = this._cookieService.get(`${this._utils.appName}_user`);
    user = JSON.parse(user)
    let user_id = user._id
    this._userService.getPendingInvitations(this.apiGetTeamPendingInvitationsUrl, user_id)
      .then((data) => {
        this.pendingInvitations = data.result;
      });
  }

  timeSince(date: any): any {
    let rDate: any = new Date(date);
    let d: any = new Date();
    let seconds: any = Math.floor((d - rDate) / 1000);
    let interval: any = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " YEARS AGO";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " MONTHS AGO";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " DAYS AGO";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " HOURS AGO";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " MINUTES AGO";
    }
    return Math.floor(seconds) + " SECONDS AGO";
  }
}