import { PaginatedResult } from './../_models/pagination';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  paginationResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

  constructor(private http: HttpClient) { }

  getMembers(page?: number, itemsPerPage?: number): Observable<PaginatedResult<Member[]>> {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    return this.http.get<Member[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe(
      map(response => {
        this.paginationResult.result = response.body;
        if (response.headers.get('Pagination')) {
          this.paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginationResult;
      })
    );
  }

  getMember(username: string): Observable<Member> {
    const member = this.members.find(x => x.username === username);
    if (member) { return of(member); }
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member): Observable<any> {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number): Observable<any> {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
