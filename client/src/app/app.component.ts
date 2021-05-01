import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Dating app';
  users: User[];
  constructor(private http: HttpClient, private accountService: AccountService) {}

  getUsers(): void {
    this.http.get('https://localhost:5001/api/users').subscribe((x: User[]) => {
      this.users = x;
      console.log(this.users)
      }, error => console.log(error)
    )
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }
}
