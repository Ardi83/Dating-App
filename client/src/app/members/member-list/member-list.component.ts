import { User } from '../../_models/user';
import { UserParams } from './../../_models/userParams';
import { Pagination } from './../../_models/pagination';
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
  user: User;
  userParams: UserParams;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' }
  ];

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(res => {
      this.members = res.result;
      this.pagination = res.pagination;
    });
  }

  resetFilters(): void {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(e: any): void {
    this.userParams.pageNumber = e.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }
}
