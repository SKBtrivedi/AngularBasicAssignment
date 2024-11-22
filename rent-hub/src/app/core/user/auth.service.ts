import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersKey = 'users'; // Key for storing users in localStorage
  private loggedInUserKey = 'loggedInUser'; // Key for storing the logged-in user's name

  // Getter for retrieving the list of users
  private get users(): { email: string; name: string; password: string }[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }

  // Setter for updating the list of users
  private set users(value: { email: string; name: string; password: string }[]) {
    localStorage.setItem(this.usersKey, JSON.stringify(value));
  }

  // Method for user registration
  register(email: string, name: string, password: string): boolean {
    const users = this.users;
    if (users.some((user) => user.email === email)) {
      return false; // Email already exists
    }
    // Add new user to the list
    users.push({ email, name, password });
    this.users = users; // Save updated users list to localStorage
    return true;
  }

  // Method for user login
  login(email: string, password: string): boolean {
    const user = this.users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(this.loggedInUserKey, JSON.stringify(user)); // Save the logged-in user's name
      return true;
    }
    return false;
  }

  // Method for logging out
  logout(): void {
    localStorage.removeItem(this.loggedInUserKey);
  }

  // Check if a user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.loggedInUserKey);
  }

  // Retrieve the logged-in user's name
  getLoggedInUser(): { name: string; email: string } | null {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser ? JSON.parse(loggedInUser) : null;
  }

}
