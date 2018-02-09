import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UtilsService } from '../../providers/utils.service';
import { UserService } from "../../providers/user/user.service";

@Injectable()
export class TeamListResolve implements Resolve<any> {

    constructor(
        private _userService: UserService,
        private _utils: UtilsService,
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this._userService.getTeamEmployees(this._utils.userConstID);
    }
}
