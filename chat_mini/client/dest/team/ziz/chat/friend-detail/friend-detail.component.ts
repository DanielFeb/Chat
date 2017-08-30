import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }         from '@angular/core';
import { ActivatedRoute, ParamMap }         from '@angular/router';
import { Location }                         from '@angular/common';

import { User }        from '../model/user';
import { FriendService } from '../service/friend-list.service';

@Component({
    selector: 'friend-detail',
    templateUrl: './friend-detail.component.html',
    styleUrls: [ './friend-detail.component.css' ]
})

export class FriendDetailComponent implements OnInit {
    @Input()
    friend: User;

    constructor(
        private friendService: FriendService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.friendService.getFriend(+params.get('id')))
            .subscribe(friend => this.friend = friend);
    }

    save(): void {
        this.friendService.update(this.friend)
            .then(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
};
