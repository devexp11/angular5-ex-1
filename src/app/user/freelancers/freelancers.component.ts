import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from "../../providers/user/user.service";
import {Observable} from 'rxjs';
import { UtilsService } from '../../providers/utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-freelancers',
  templateUrl: './freelancers.component.html',
  styleUrls: ['./freelancers.component.scss']
})
export class FreelancersComponent implements OnInit {

  current_page: number = 1;
  limit: number = 2; 
  skip: number = 0 ; 
  filteredDataCount: number = 0; 
  pages_count: number = 0;
  pagesArr = [];
  freelancers_list = [];
  
  constructor(
  	public _utils: UtilsService,
    private _userService: UserService
    ) { }

  ngOnInit() {
  	this.getFreelancersPaged()
  }


    getFreelancersPagedCount(){
      this._userService.getFreelancersPagedCount().then((data) => {
          this.filteredDataCount = data.data;
          this.pages_count = Math.ceil(data.data/this.limit);
          this.pagesArr.length=this.pages_count;          
          });      
    }

   getFreelancersPaged(){    

      this.getFreelancersPagedCount();
      this._userService.getFreelancersPaged(this.limit,this.skip).then((data) => {
        console.log(data.data);
      	this.freelancers_list = data.data
        });

    }

    paginate(page){
      
      this.current_page = page;
      this.skip = this.current_page * this.limit - this.limit;
      this.getFreelancersPaged()

    }

    nextForrword(nf){
      if((nf == "forward" && this.current_page<=1) ||  (nf == "next" && this.current_page == this.pages_count )){
        console.log("first or last page")
      }else{
        if(nf === "forward"){
          this.current_page = this.current_page - 1 ;
        }else if(nf === "next"){
          this.current_page = this.current_page + 1 ;
        }
        this.skip = this.current_page * this.limit - this.limit;
        this.getFreelancersPaged()
      }
    }
}
