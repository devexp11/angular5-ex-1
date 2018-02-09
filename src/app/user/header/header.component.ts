import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../providers/auth/auth.service";
import { UtilsService } from '../../providers/utils.service';
import { UserService } from "../../providers/user/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  find_text: string = "";
  findedFreelancers = [];

  constructor(
    private _authService: AuthService,
    private _utils: UtilsService,
    private _userService: UserService,
    private _router: Router
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

  findFreelancers(event){
    console.log("find event",event)
    console.log("find text",this.find_text)
   // if(this.find_text || this.find_text.trim()){
      this._userService.findFreelancers(this.find_text).then((data) => {
         
          this.findedFreelancers = data.data  
           console.log("searched data",this.findedFreelancers)   
          });  
   // }
      
  }

freelancerDetails(event){
  ///user/freelancers/profile
  console.log("redirect to freelancer details page",event)
  this._router.navigate(["/user/freelancers/profile"]);
}

}
