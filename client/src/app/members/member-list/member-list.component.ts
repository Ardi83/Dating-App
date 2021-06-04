import { Pagination } from './../../_models/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from './../../_services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe(res => {
      this.members = res.result;
      this.pagination = res.pagination;
    });
  }

  pageChanged(e: any): void {
    this.pageNumber = e.page;
    this.loadMembers();
  }
}
