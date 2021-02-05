import { User } from './app.d';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Dating app';
  users: object;
  constructor(private http: HttpClient) {}

  getUsers(): void {
    this.http.get('https://localhost:5001/api/users').subscribe(x => {
      this.users = x;
      console.log(this.users)
      }, error => console.log(error)
    )
  }
  ngOnInit(): void {
    this.getUsers()
  }
}
