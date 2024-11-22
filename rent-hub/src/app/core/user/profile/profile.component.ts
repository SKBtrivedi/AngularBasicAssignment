import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: { name: string; email: string } | null = null;

  ngOnInit(): void {
    try {
      const loggedInUser = localStorage.getItem('loggedInUser');
      this.user = loggedInUser ? JSON.parse(loggedInUser) : null;
    } catch (error) {
      console.error('Error parsing loggedInUser from localStorage:', error);
      this.user = null; // Set user to null if parsing fails
    }
  }
}
