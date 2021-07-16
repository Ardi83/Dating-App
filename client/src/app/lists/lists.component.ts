import { Pagination } from './../_models/pagination';
import { LikesParams, Predicate } from './../_models/LikesParams';
import { MembersService } from './../_services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  likesParams: LikesParams = {
    predicate: Predicate.liked,
    pageNumber: 1,
    pageSize: 5
  };
  pagination: Pagination;

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(): void {
    this.memberService.getLikes(this.likesParams).subscribe(response => {
      this.members = response.result;
      console.log(this.members);
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any): void {
    this.likesParams.pageNumber = event.page;
    this.loadLikes();
  }
}
