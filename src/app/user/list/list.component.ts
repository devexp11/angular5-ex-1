import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from "../../providers/user/user.service";
import {Observable} from 'rxjs';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
  freelancers: Observable<any[]>;

  constructor(
    private _userService: UserService
  ) { }

  private getUsers() {
    this._userService.getFreelancers()
    .subscribe((res:any) => {
      this.freelancers = res.data;
    })
  }


  ngOnInit() {
    this.getUsers();
  }

}
