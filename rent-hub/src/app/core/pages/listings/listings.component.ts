import { Component, OnInit } from '@angular/core';
import { ApartmentService } from '../apartment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  apartments: any[] = [];
  filteredApartments: any[] = [];
  highlightedApartments: any[] = [];
  paginatedApartments: any[] = [];
  searchText: string = '';
  locationFilter: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  selectedAmenities: string[] = [];
  amenitiesList: string[] = ['Wi-Fi', 'Parking', 'Gym', 'Swimming Pool', 'Elevator'];
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;
  isFavoritesPage: boolean = false;

  constructor(private apartmentService: ApartmentService, private router: Router) { }

  ngOnInit() {
    this.isFavoritesPage = this.router.url === '/favorites';
    this.apartments = this.apartmentService.getApartments();
    this.filteredApartments = this.isFavoritesPage
      ? this.apartments.filter((apartment) => apartment.isFavorite)
      : [...this.apartments];
    this.highlightedApartments = this.apartmentService.getHighlightedApartments();
    this.updatePagination();
  }

  applyFilters() {
    this.filteredApartments = this.apartments.filter((apartment) => {
      const matchesSearch = apartment.title.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesLocation = !this.locationFilter || apartment.location.includes(this.locationFilter);
      const matchesPrice =
        (this.minPrice === null || apartment.price >= this.minPrice) &&
        (this.maxPrice === null || apartment.price <= this.maxPrice);
      const matchesAmenities =
        this.selectedAmenities.length === 0 ||
        this.selectedAmenities.every((amenity) => apartment.amenities.includes(amenity));

      return matchesSearch && matchesLocation && matchesPrice && matchesAmenities;
    });

    this.currentPage = 1; // Reset to first page after filtering
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredApartments.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedApartments = this.filteredApartments.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  toggleAmenitySelection(amenity: string) {
    if (this.selectedAmenities.includes(amenity)) {
      this.selectedAmenities = this.selectedAmenities.filter((a) => a !== amenity);
    } else {
      this.selectedAmenities.push(amenity);
    }
    this.applyFilters();
  }

  toggleFavorite(id: number) {
    this.apartmentService.toggleFavorite(id);
    this.applyFilters(); // Update the list after toggling favorite
  }

  viewDetails(id: number) {
    this.router.navigate(['/details', id]);
  }
}
