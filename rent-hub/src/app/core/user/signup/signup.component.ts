import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.signupForm.valid) {
      const { name, email, password, confirmPassword } = this.signupForm.value;
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      const success = this.authService.register(email!, name!, password!);
      if (success) {
        alert('Registration successful! You can now log in.');
        this.signupForm.reset();
        this.router.navigate(['/login']); // Redirect to Login Page
      } else {
        alert('Registration failed. Email is already registered.');
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }

}
