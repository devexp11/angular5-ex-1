import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../providers/project/project.service";
import {Observable} from 'rxjs';



@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {

  userProjects:any;

  current_page: number = 1;
  limit: number = 2; 
  skip: number = 0 ; 
  filteredDataCount: number = 0; 
  pages_count: number = 0;
  pagesArr = [];

  constructor(
    private _projectService: ProjectService
  ) { 
    this.userProjects = [];
  }

  ngOnInit() {
    // this._projectService.getProjectsByUserId().subscribe(data => {
    //   var result = data.json();    
    //   this.userProjects = result['data'];
    // })
    this.getUsersProjectsPaged()
  }
 


    getUsersProjectsPagedCount(){
      this._projectService.getUsersProjectsPagedCount().then((data) => {
          this.filteredDataCount = data.data;
          this.pages_count = Math.ceil(data.data/this.limit);
          this.pagesArr.length=this.pages_count;          
          });      
    }

   getUsersProjectsPaged(){  
      this.getUsersProjectsPagedCount();
      this._projectService.getUsersProjectsPaged(this.limit, this.skip).subscribe(data => {
          var result = data.json();    
          this.userProjects = result['data'];
      });
      

    }

    paginate(page){
      
      this.current_page = page;
      this.skip = this.current_page * this.limit - this.limit;
      this.getUsersProjectsPaged()

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
        this.getUsersProjectsPaged()
      }
    }

}
