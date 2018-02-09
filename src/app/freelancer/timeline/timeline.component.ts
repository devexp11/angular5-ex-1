import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from "../../providers/user/user.service";
import {Observable} from 'rxjs';
import { UtilsService } from '../../providers/utils.service';
import * as moment from 'moment';

import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimelineComponent implements OnInit {

  userId: string = '';
  logs: Observable<any[]>;
  logs2: any[];
  imagePreview: string = '';
  team: any[];
  days:any[] = [];

  current_page: number = 1;
  limit: number = 5; 
  skip: number = 0 ; 
  filteredDataCount: number = 0; 
  pages_count: number = 0;
  pagesArr = []

  range_start : Date;
  range_end : Date;

  selected_date: any = false;
  selection_type :string;
  filter_type:string;
  filter_date:any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _modalService: NgbModal,
    public _utils: UtilsService,
    private _userService: UserService
  ) { }

  viewImage(_content, _image) {
    this.imagePreview = _image;
    this._modalService.open(_content, {size: 'lg'}).result
    .then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

  ngOnInit() {
        this._activatedRoute.params.subscribe((params: Params) => {
          this.userId = params['userId'];    
        });

        this.team = this._userService.getTeamEmployees(parseInt(this.userId)); 

        var today= new Date();
        var start = today.setHours(0,0,0,0);
            this.range_start = new Date(start)
        var end = today.setHours(23,59,59,59);
            this.range_end= new Date(end);
     
        this.filterByDate(false,'today');

        var totalDays = moment().daysInMonth();
        var allDays = moment().days()
        let startDay = 0;
            startDay = parseInt(moment().startOf('month').format('d'));
        var lastDate = moment().endOf('month').format('D');
        var day = ['SUN','MON','TUE','WED','THU', 'FRI', 'SAT'];
        var i;
        for(i = 1; i <= lastDate; i++)
        {
          var obj = {'day': day[(startDay % 7)], 'date': i };
          startDay++;
          this.days.push(obj);
        }
  }


    getLogsByID(){
        this._userService.getLogsByID(parseInt(this.userId)).then((data) => {
            let finalArr: any[] = [];

            data.result.forEach((elem) => {
              let obj: any = {};
              if(elem.job[0])
              obj.job_id = elem.job[0].name;
              if(elem.task[0])
              obj.task_id = elem.task[0].name;
              if(elem.task[0])
              obj.task_description = elem.task[0].description;
              obj.img_url = this._utils.backURL + '/' + elem.img_url;
              finalArr.push(obj);
            });
            this.logs2 = finalArr;
          });
    }


    getImagesPagedCount(range_start,range_end){

      this._userService.getImagesPagedCount(parseInt(this.userId),range_start,range_end).then((data) => {
          this.filteredDataCount = data.data;
          this.pages_count = Math.ceil(data.data/this.limit);
          this.pagesArr.length=this.pages_count;
                   
          });
      
    }


    onTabChange(event){
      console.log("event",event.index)
      if(event.index == '0'){
        this.selected_date = false;
        this.selection_type = 'by_one_week';
      }
      if(event.index == '1'){
        this.selected_date = false;
        this.selection_type = 'by_two_weeks';
      }
      if(event.index == '2'){
        this.selected_date = false;
        this.selection_type = 'by_month';
      }
       if(event.index =='3'){
        this.selected_date = false;
        this.selection_type = 'today';
      }

       this.filterByDate(this.selected_date,this.selection_type)
    }


  getSelectedRange(date,filter_type){
    var today= new Date();
          today.setHours(0,0,0,0);
      if(filter_type == "today"){
           let today= new Date();
        let start = today.setHours(0,0,0,0);
         this.range_start = new Date(start)
        let end = today.setHours(23,59,59,59);
         this.range_end= new Date(end);
     
      }
      if(filter_type == "by_day"){       
          today.setDate(date.date)
          this.range_start = new Date(today.setDate(date.date));
          today.setHours(23,59,59,59);
          today.setDate(date.date)
          this.range_end = new Date(today.setDate(date.date))
         
      }
      if(filter_type == "by_one_week"){
         today.setHours(23,59,59,59)
         this.range_end = today
         this.range_start= new Date(this.range_end)
         this.range_start.setDate(this.range_end.getDate() - 7);
      }
      if(filter_type == "by_two_weeks"){
         today.setHours(23,59,59,59)
         this.range_end = today
         this.range_start= new Date(this.range_end)
         this.range_start.setDate(this.range_end.getDate() - 14);
      }
      if(filter_type == "by_month"){
        today.setHours(23,59,59,59)
         this.range_end = today
         this.range_start= new Date(this.range_end)
         this.range_start.setDate(this.range_end.getDate() - 30);
      }
    }


   filterByDate(d, filter_type){
     this.filter_type = filter_type;
     this.filter_date = d;

     // console.log(this.range_start,"start");
     // console.log(this.range_end,"end");

      this.getSelectedRange(d,filter_type)
      this.getImagesPagedCount(this.range_start,this.range_end);

      this._userService.getLogsFiltered(parseInt(this.userId),this.limit,this.skip, this.range_start, this.range_end).then((data) => {
          
          let finalArr: any[] = [];
          data.data.forEach((elem) => {
            let obj: any = {};
            if(elem.job[0])
            obj.job_id = elem.job[0].name;
            if(elem.task[0])
            obj.task_id = elem.task[0].name;
            if(elem.task[0])
            obj.task_description = elem.task[0].description;
            obj.img_url = this._utils.backURL + '/' + elem.img_url;
            var date = new Date(elem.log_date)
            var hours:any = date.getHours();
            var minutes:any = date.getMinutes();
            var ampm:any = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            var ampm:any = date.getHours() >= 12 ? 'PM' : 'AM';
            obj.log_date = hours + ":" + minutes + " "+ampm;

            finalArr.push(obj);
          });
          this.logs2 = finalArr;
        });
    }

    paginate(page){
      
      this.current_page = page;
      this.skip = this.current_page * this.limit - this.limit;
      this.filterByDate(this.filter_date, this.filter_type)

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
        this.filterByDate(this.filter_date, this.filter_type)
      }
    }
}
