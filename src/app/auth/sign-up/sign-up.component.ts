import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../providers/auth/auth.service';
import { CookieService } from 'ngx-cookie';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {
  setup: boolean = true;
  user: any;
  alert: any;
  submitBtn: any;
  errors: any;
  invitation_code: string;
  sub: any;

  constructor(
    private _authService: AuthService,
    private _cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.reset();
  }

  private reset() {
    this.errors = [];
    this.user = {
      user_role: '',
      email: '',
      first_name: '',
      last_name: '',
      company_name: '',
      is_project_owner: false,
      password: '',
      confirm_password: '',
      referrer: ''
    };
    this.alert = {
      type: null,
      message: null
    };
    this.submitBtn = {
      isLoading: false,
      caption: 'Create Account'
    };
  }

  closeAlert() {
    this.alert.type = null;
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.invitation_code = params.invitation_code
    });

    if (this.invitation_code) {
      this.setup = false;
      this.user.user_role = "FREELANCER"
    }
  }

  signUp() {
    if (!this.submitBtn.isLoading) {
      this.user.referrer = this._cookieService.get(`${this._authService._utils.appName}_referrer`) ? this._cookieService.get(`${this._authService._utils.appName}_referrer`) : null;
      this.alert.type = null;
      this.submitBtn.isLoading = true;
      this.submitBtn.caption = 'Please wait...';

      this._authService.signUp(this.user)
        .then((res: any) => {
          this.reset();
          this.alert.type = 'success';
          this.alert.message = res.message;

          if (this.invitation_code) {
            var invite_link = '/user/team/teamInvitation/acceptTeamInvitation/' + this.invitation_code
            console.log("invite_link", invite_link)
            this._authService.acceptInvite(invite_link).
              then((res: any) => {
                console.log("invitation accepted")
              })
              .catch(err => {
                console.log("cant accept invitation", err)
              })
          }

        })
        .catch(err => {
          console.log(err)
          this.submitBtn.isLoading = false;
          this.submitBtn.caption = 'Create Account';
          this.alert.type = 'danger';
          this.alert.message = err.message;
          this.errors = err.errors;
        })
    }
  }

  next() {
    this.setup = false;
  }

}
