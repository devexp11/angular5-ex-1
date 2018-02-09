import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';
import { JobService } from "../../providers/job/job.service";
import { UserService } from "../../providers/user/user.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'user-job-tasks',
  templateUrl: './job-tasks.component.html',
  styleUrls: ['./job-tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobTasksComponent implements OnInit {

  jobTasks: any;
  job: any;
  task: any;
  jobId: string;
  modal: any;
  submitBtn: any;
  errors: any;
  users: IMultiSelectOption[];
  userJobs: any;
  lihide: boolean;
  createnew: boolean;
  selectUser: boolean;

  optionsModel: number[];
  myOptions: IMultiSelectOption[];
  

  current_page: number = 1;
  limit: number = 5; 
  skip: number = 0 ; 
  filteredDataCount: number = 0; 
  pages_count: number = 0;
  pagesArr = [];
  max_load = 2; //max tasks count to load on init
  load_start;
  load_end;
  onChange() {
    console.log(this.users);
}
// Settings configuration
mySettings: IMultiSelectSettings = {
  checkedStyle: 'fontawesome',
  buttonClasses: 'btn btn-default btn-block',
  dynamicTitleMaxItems: 1,
  displayAllSelectedText: true,
  pullRight: false,
  closeOnSelect: false,
  autoUnselect: false,
  showCheckAll: true,
  showUncheckAll: true,
  maxHeight: '150px',
  isLazyLoad: true,
  loadViewDistance: 1,
  stopScrollPropagation: true,
  selectAddedValues: true
};

// Text configuration
myTexts: IMultiSelectTexts = {
  checkAll: 'Select all',
  uncheckAll: 'Unselect all',
  checked: 'item selected',
  checkedPlural: 'items selected',
  defaultTitle: 'Select',
  allSelected: 'All selected',
};
  builderDrop($event,tasks){

    // Iterating each task
    tasks.forEach((task:any, index) => {
      // Checking current dragged task
      if(task._id == $event.value._id){
        let order = 0;
        if(index == 0){
          // Check for first element
          // Deducting display order
          order = tasks[index+1].display_order - 10;
        } else {
          // Increasing display order
          order = tasks[index-1].display_order + 10;
        }
        // Call service for task update
        this._jobService.updateTask(task._id, order)
          .subscribe((res:any) => {
            console.log('api response',res);
          })

        return;
      }
    });
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private _jobService: JobService,
    private _userService: UserService,
    private _modalService: NgbModal,
    private _toastyService: ToastyService,
    private _toastyConfig: ToastyConfig,
  ) {
    this.userJobs = [];
    this.users = [];
  }

  // private getJobTasks() {
  //   this._jobService.getJobTasks(this.jobId)
  //   .subscribe((res:any) => {
  //     if(!this.job)
  //       this.job = res.job;

  //     this.jobTasks = res.tasks;
  //   })
  // }

  private getUsers() {
    this._userService.getFreelancers()
    .subscribe((res:any) => {
      res.data.forEach((user1:any) =>{
        let obj = {'id': user1._id, 'name':user1.fullname};
        this.users.push(obj);
      });
    })
  }

  private getJobs() {
    let userJobs = this._jobService.getSimpleJobs().subscribe(
      data=>{
        let userJobs = data.json().data;
        userJobs.forEach((job:any) => {
          job['isOpen'] = 0;
          this.userJobs.push(job);
        });
      }
    );
  }

   


  private resetTask() {
    this.task = {
      name: '',
      description: '',
      assigned: []
    };
    // this.submitBtn = {
    //   isLoading: false,
    //   caption: 'Submit'
    // };
  }

  taskForm(_content,index) {
    this.resetTask();
    this.userJobs[index]['isOpen'] = 1;
    this.selectUser = false;
  }
  showUsers(){
    this.selectUser = true;
  }
  hideUsers(){
    this.selectUser = false;
  }
  showCreateNew(_content,index){
    this.userJobs[index]['isOpen'] = 0;
    this.selectUser = false;
  }

  submit(index) {
    // if (!this.submitBtn.isLoading) {
      this.selectUser = false;
      this.errors = [];
      // this.submitBtn.isLoading = true;
      // this.submitBtn.caption = 'Please wait...';
      this._jobService.postTask(this.userJobs[index]._id, this.task)
        .subscribe(res => {
          var toastOptions: ToastOptions = {
            title: "Message",
            msg: "Task was added to job successfully.",
            showClose: true,
            timeout: 3000
          };
          this._toastyService.success(toastOptions);
          // this.getJobTasks();
          // this.modal.close();
          // this.lihide = false;
          // this.createnew = true;
          this.userJobs[index]['isOpen'] = 0;
          this.userJobs[index].tasks.push(res);
        }, err => {
          let error = err.json();
          // this.submitBtn.isLoading = false;
          // this.submitBtn.caption = 'Submit';
          this.errors = error;
        })
    // }
  }

  ngOnInit() {
    this.resetTask();
    this._toastyConfig.theme = 'bootstrap';
    this.activatedRoute.params.subscribe((params: Params) => {
        // this.jobId = params['jobId'];
        // this.getJobTasks();
        this.getUsers();
     //   this.getJobs();
        this.getUserJobsPaged()
        // console.log('user jobs',this.userJobs);
        // this.createnew = true;
        // this.lihide = false;
        // this.userJobs[index]['isOpen'] = 1;

      });
    
  }


getUserJobsPagedCount(){
        this._jobService.getUserJobsPagedCount().then((data) => {
            this.filteredDataCount = data.data;
            this.pages_count = Math.ceil(data.data/this.limit);
            this.pagesArr.length=this.pages_count;   
       
            });      
      }

   getUserJobsPaged(){   
      this.userJobs = []; 
      let userJobs = [];
      userJobs = this._jobService.getSimpleJobsPaged(this.limit, this.skip, this.max_load).subscribe(
      data=>{
        let userJobs = data.json().data;
        userJobs.forEach((job:any) => {
          job['isOpen'] = 0;
          this.userJobs.push(job);
        });
      }
    );
      this.getUserJobsPagedCount();
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
   
//load_start: number, load_end: number, job_id : number
    loadMore(job,job_index){
      console.log("load More ", job);

      let job_tasks_count =  this.userJobs[job_index].max_task_load;
       

      if(job_tasks_count<=this.userJobs[job_index].tasks.length){
         console.log("no tasks to load")
       }else{
       
       this.load_start = this.userJobs[job_index].tasks.length;
       this.load_end = this.load_start + this.max_load;

      this._jobService.loadTasksForJob(this.load_start,this.load_end, job._id).subscribe(
      data=>{
         let loadTasks = data.json().data;
             this.userJobs[job_index].tasks = this.userJobs[job_index].tasks.concat(loadTasks.tasks);
             this.userJobs[job_index].max_task_load = loadTasks.max_task_load
       
        });
      }
   }
  

}
