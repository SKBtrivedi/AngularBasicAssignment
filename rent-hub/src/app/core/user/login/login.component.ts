import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const isAuthenticated = this.authService.login(email!, password!);
      if (isAuthenticated) {
        alert('Login successful!');
        this.router.navigate(['/listings']); // Redirect to Listings Page
      } else {
        alert('Invalid email or password.');
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }


}
