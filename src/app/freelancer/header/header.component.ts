import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../providers/auth/auth.service";
import { UtilsService } from '../../providers/utils.service';
@Component({
  selector: 'user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _utils: UtilsService,
  ) { }

  ngOnInit() {
  }

  logout() {
    this._authService.logout()
      .then((res: any) => {
      console.log(res);
        setTimeout(() => {
          window.location.href = '/auth';
        }, 1000);
      })
      .catch(err => {
        console.log(err.detail)
      })
  }
}
