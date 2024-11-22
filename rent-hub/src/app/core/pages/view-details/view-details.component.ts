import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApartmentService } from '../apartment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  apartment: any;
  comments: { author: string; text: string }[] = [];
  commentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apartmentService: ApartmentService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    // Initialize the comment form
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
    });
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.apartment = this.apartmentService.getApartments().find((apt) => apt.id === id);

    // Redirect back if apartment not found
    if (!this.apartment) {
      this.router.navigate(['/listings']);
    }
  }

  goBack() {
    this.router.navigate(['/listings']);
  }

  addComment() {
    if (this.commentForm.valid) {
      const currentUser = this.authService.getLoggedInUser(); // Fetch the logged-in user from AuthService
      const newComment = {
        author: currentUser ? currentUser.name : 'Guest', // Use the user's name if logged in; otherwise, 'Guest'
        text: this.commentForm.value.comment,
      };
      this.comments.push(newComment);
      this.commentForm.reset();
    }
  }
}
