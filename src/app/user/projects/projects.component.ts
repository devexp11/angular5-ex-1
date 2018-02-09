import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectService } from "../../providers/project/project.service";
import {Observable} from 'rxjs';

@Component({
  selector: 'user-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsComponent implements OnInit {

  userProjects: Observable<any[]>;

  constructor(
    private _projectService: ProjectService
  ) { }

  ngOnInit() {
    this.userProjects = this._projectService.getProjects();
  }

}
