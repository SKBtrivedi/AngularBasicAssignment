import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApartmentService } from '../apartment.service';
import { Router } from '@angular/router';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  postForm: FormGroup;
  previewMode = false;
  amenities: string[] = ['Wi-Fi', 'Parking', 'Gym', 'Swimming Pool', 'Elevator'];
  selectedAmenities: string[] = [];
  selectedImage: string | null = null; // Holds the uploaded image URL
  imageError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apartmentService: ApartmentService,
    private router: Router
  ) {
    if (!this.authService.isAuthenticated()) {
      alert('You must be logged in to create a post.');
      this.router.navigate(['/login']);
    }

    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      contactName: ['', Validators.required],
      contactNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'), // Allow only numbers
          Validators.minLength(10), // Minimum length of 10 digits
          Validators.maxLength(10), // Maximum length of 10 digits
        ],
      ],
      furnished: [false],
      vegetarian: [null, Validators.required],
    });
  }

  get isAnyAmenitySelected(): boolean {
    return this.selectedAmenities.length > 0;
  }

  toggleAmenitySelection(amenity: string) {
    if (this.selectedAmenities.includes(amenity)) {
      this.selectedAmenities = this.selectedAmenities.filter((a) => a !== amenity);
    } else {
      this.selectedAmenities.push(amenity);
    }
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.imageError = 'Only image files are allowed.';
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        this.imageError = 'File size should not exceed 2MB.';
        return;
      }
      this.imageError = null;
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  previewPost() {
    this.previewMode = true;
  }

  cancelPreview() {
    this.previewMode = false;
  }

  onSubmit() {
    if (this.postForm.valid && this.isAnyAmenitySelected) {
      const newPost = {
        ...this.postForm.value,
        amenities: this.selectedAmenities,
        image: this.selectedImage || 'assets/default.jpg', // Use uploaded image or default
      };
      this.apartmentService.addApartment(newPost);
      alert('Post Created Successfully!');
      this.previewMode = false;
      this.router.navigate(['/listings']);
    }
  }
}
