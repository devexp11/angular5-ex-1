// import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { JobService } from "../../providers/job/job.service";
// import { Observable } from 'rxjs';
// import { CookieService } from 'ngx-cookie';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

// @Component({
//   selector: 'user-jobs',
//   templateUrl: './jobs.component.html',
//   styleUrls: ['./jobs.component.scss'],
//   encapsulation: ViewEncapsulation.None
// })
// export class JobsComponent implements OnInit {

//   userJobs: Observable<any[]>;
//   allJobs: Observable<any[]>;
//   job: any;
//   submitBtn: any;
//   errors: any;

//   current_page: number = 1;
//   limit: number = 5; 
//   skip: number = 0 ; 
//   filteredDataCount: number = 0; 
//   pages_count: number = 0;
//   pagesArr = [];

//   constructor(
//     public _jobService: JobService,
//     private _toastyService: ToastyService,
//     private _toastyConfig: ToastyConfig,
//     private _cookieService: CookieService,
//   ) {
//     this._toastyConfig.theme = 'bootstrap';
//   }

//   private getJobs() {
//     this.userJobs = this._jobService.getJobsByUserId();
//   }

//   private getAllJobs() {
//     this.allJobs = this._jobService.getAllJobs();
//     console.log(this.allJobs);
//   }

//   ngOnInit() {
   
//     this.getUserJobsPaged();
//    // this.getAllJobsPaged();

//     this.getAllJobs();
//   }


//   getUserJobsPagedCount(){
//         this._jobService.getUserJobsPagedCount().then((data) => {
//             this.filteredDataCount = data.data;
//             this.pages_count = Math.ceil(data.data/this.limit);
//             this.pagesArr.length=this.pages_count;   
//                 console.log("getUserJobsPagedCount",data)
       
//             });      
//       }

//    getUserJobsPaged(){    

//       this.getUserJobsPagedCount();
//       this.userJobs = this._jobService.getUserJobsPaged(this.limit, this.skip)

//     }

//     paginate(page){
      
//       this.current_page = page;
//       this.skip = this.current_page * this.limit - this.limit;
//       this.getUserJobsPaged()

//     }

//     nextForrword(nf){
//       if((nf == "forward" && this.current_page<=1) ||  (nf == "next" && this.current_page == this.pages_count )){
//         console.log("first or last page")
//       }else{
//         if(nf === "forward"){
//           this.current_page = this.current_page - 1 ;
//         }else if(nf === "next"){
//           this.current_page = this.current_page + 1 ;
//         }
//         this.skip = this.current_page * this.limit - this.limit;
//         this.getUserJobsPaged()
//       }
//     }

///////////////////////////
// variables
// for all all jobs page
 // current_page: number = 1;
 //  limit: number = 5; 
 //  skip: number = 0 ; 
 //  filteredDataCount: number = 0; 
 //  pages_count: number = 0;
 //  pagesArr = [];
//  allJobs
//onInit call --- getAllJobsPaged()
//      getAllJobsPagedCount(){
//           this._jobService.getAllJobsPagedCount().then((data) => {
//               this.filteredDataCount = data.data;
//               this.pages_count = Math.ceil(data.data/this.limit);
//               this.pagesArr.length=this.pages_count;   
//                   console.log("getAllJobsPagedCount",data)
         
//               });      
//         }

//      getAllJobsPaged(){    

//         this.getAllJobsPagedCount();
//         this.allJobs = this._jobService.getAllJobsPaged(this.limit, this.skip)
//       }

//      paginate(page){
          
//           this.current_page = page;
//           this.skip = this.current_page * this.limit - this.limit;
//           this.getAllJobsPaged()

//         }

//     nextForrword(nf){
//       if((nf == "forward" && this.current_page<=1) ||  (nf == "next" && this.current_page == this.pages_count )){
//         console.log("first or last page")
//       }else{
//         if(nf === "forward"){
//           this.current_page = this.current_page - 1 ;
//         }else if(nf === "next"){
//           this.current_page = this.current_page + 1 ;
//         }
//         this.skip = this.current_page * this.limit - this.limit;
//         this.getAllJobsPaged()
//       }
//     }
//  }

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JobService } from "../../providers/job/job.service";
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'user-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobsComponent implements OnInit {

  userJobs: Observable<any[]>;
  allJobs: Observable<any[]>;
  job: any;
  submitBtn: any;
  errors: any;

  current_page: number = 1;
  limit: number = 5; 
  skip: number = 0 ; 
  filteredDataCount: number = 0; 
  pages_count: number = 0;
  pagesArr = [];

  constructor(
    public _jobService: JobService,
    private _toastyService: ToastyService,
    private _toastyConfig: ToastyConfig,
    private _cookieService: CookieService,
  ) {
    this._toastyConfig.theme = 'bootstrap';
  }

  private getJobs() {
    this.userJobs = this._jobService.getJobsByUserId();
  }

  private getAllJobs() {
    this.allJobs = this._jobService.getAllJobs();
    console.log(this.allJobs);
  }

  ngOnInit() {
   
    this.getUserJobsPaged();
   // this.getAllJobsPaged();

    this.getAllJobs();
  }


  getUserJobsPagedCount(){
        this._jobService.getUserJobsPagedCount().then((data) => {
            this.filteredDataCount = data.data;
            this.pages_count = Math.ceil(data.data/this.limit);
            this.pagesArr.length=this.pages_count;   
                console.log("getUserJobsPagedCount",data)
       
            });      
      }

   getUserJobsPaged(){    

      this.getUserJobsPagedCount();
      this.userJobs = this._jobService.getUserJobsPaged(this.limit, this.skip)

    }

    paginate(page){
      
      this.current_page = page;
      this.skip = this.current_page * this.limit - this.limit;
      this.getUserJobsPaged()

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
        this.getUserJobsPaged()
      }
    }

///////////////////////////
// variables
// for all all jobs page
 // current_page: number = 1;
 //  limit: number = 5; 
 //  skip: number = 0 ; 
 //  filteredDataCount: number = 0; 
 //  pages_count: number = 0;
 //  pagesArr = [];
//  allJobs
//onInit call --- getAllJobsPaged()
//      getAllJobsPagedCount(){
//           this._jobService.getAllJobsPagedCount().then((data) => {
//               this.filteredDataCount = data.data;
//               this.pages_count = Math.ceil(data.data/this.limit);
//               this.pagesArr.length=this.pages_count;   
//                   console.log("getAllJobsPagedCount",data)
         
//               });      
//         }

//      getAllJobsPaged(){    

//         this.getAllJobsPagedCount();
//         this.allJobs = this._jobService.getAllJobsPaged(this.limit, this.skip)
//       }

//      paginate(page){
          
//           this.current_page = page;
//           this.skip = this.current_page * this.limit - this.limit;
//           this.getAllJobsPaged()

//         }

//     nextForrword(nf){
//       if((nf == "forward" && this.current_page<=1) ||  (nf == "next" && this.current_page == this.pages_count )){
//         console.log("first or last page")
//       }else{
//         if(nf === "forward"){
//           this.current_page = this.current_page - 1 ;
//         }else if(nf === "next"){
//           this.current_page = this.current_page + 1 ;
//         }
//         this.skip = this.current_page * this.limit - this.limit;
//         this.getAllJobsPaged()
//       }
//     }
 }

