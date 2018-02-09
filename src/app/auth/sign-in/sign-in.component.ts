import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {

  user: any;
  submitBtn: any;
  alert: any;
  errors: any;
  invitation_code: string = "";

  constructor(
    private _authService: AuthService
  ) {
    this.reset();
  }

  private reset() {
    this.errors = [];
    this.user = {
      email: '',
      password: ''
    };
    this.alert = {
      type: null,
      message: null
    };
    this.submitBtn = {
      isLoading: false,
      caption: 'Login'
    };
  }

  closeAlert() {
    this.alert.type = null;
  }

  ngOnInit() {
  }

  login() {
    if (!this.submitBtn.isLoading) {
      this.errors = [];
      this.alert.type = null;
      this.submitBtn.isLoading = true;
      this.submitBtn.caption = 'Please wait...';
      this._authService.login('login', this.user)
        .then((res: any) => {
          this.reset();
          if (res.data.user.user_role == "EMPLOYER") {
            window.location.href = '/user/team';
          }
          else if (res.data.user.user_role == "FREELANCER") {
            window.location.href = '/freelancer/reports';
          }
        })
        .catch(err => {
          this.submitBtn.isLoading = false;
          this.submitBtn.caption = 'Login';
          this.alert.type = 'danger';
          this.alert.message = err.message;
          this.errors = err.errors;
        })
    }
  }

}
