import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../providers/auth/auth.service";
import { UtilsService } from '../../providers/utils.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';


@Component({
  selector: 'user-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {
  showMenu: boolean;
  constructor(
    private _authService: AuthService,
    private _utils: UtilsService,
    private router: Router
  ) {
    router.events.subscribe( (event: Event) => {

      if (event instanceof NavigationStart) {
         // Show loading indicator
        this.showMenu = false;
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
    }

    if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        console.log(event.error);
    }
    });
  }
  public scrollbarOptions = { axis: 'y', theme: 'light' };

  ngOnInit() {
    this.showMenu = false;
  }

  displayMenu() {
    this.showMenu = !this.showMenu ;
  }

  // logout() {
  //   console.log('in menu component logout');
  //   this._authService.logout()
  //     .then((res: any) => {
  //     console.log(res);
  //       setTimeout(() => {
  //         window.location.href = '/auth';
  //       }, 1000);
  //     })
  //     .catch(err => {
  //       console.log(err.detail)
  //     })
  // }

}
