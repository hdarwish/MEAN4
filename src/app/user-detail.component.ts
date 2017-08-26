import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { User }        from './user';
import { UserService } from './user.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
@Input()   user: User;

constructor(
  private userService: UserService,
  private route: ActivatedRoute,
  private location: Location
) {}

ngOnInit(): void {

  // this.route.paramMap
  //   .switchMap((params: ParamMap) => this.userService.getUser(+params.get('id')))
  //   .subscribe(user => this.user = user);

    this.route.params
        .map(params => params['id'])
        .switchMap(id => this.userService.getUser(id))
        .subscribe(user => this.user = user);
}
goBack(): void {
  this.location.back();
}
save(): void {
  this.userService.update(this.user)
    .then(() => this.goBack());
}
}
