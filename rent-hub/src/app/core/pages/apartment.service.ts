import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  private apartments = [
    {
      id: 1,
      title: 'Cozy 2BHK Apartment',
      description: 'A beautiful and cozy 2-bedroom apartment in the city center.',
      location: 'Downtown, Cityville',
      price: 1500,
      amenities: ['Wi-Fi', 'Parking', 'Gym'],
      image: 'assets/120201715813.jpg',
      isFavorite: false,
      isHighlighted: true,
    },
    {
      id: 2,
      title: 'Luxury Penthouse',
      description: 'A spacious and luxurious penthouse with stunning views.',
      location: 'Uptown, Cityville',
      price: 5000,
      amenities: ['Swimming Pool', 'Wi-Fi', 'Parking', 'Elevator'],
      image: 'assets/Photos-Apartment-HD.jpg',
      isFavorite: false,
      isHighlighted: true,
    },
    {
      id: 3,
      title: 'Budget Studio Apartment',
      description: 'Affordable studio apartment ideal for single tenants.',
      location: 'Suburbs, Cityville',
      price: 800,
      amenities: ['Wi-Fi', 'Parking'],
      image: 'assets/Kitchen3-1536.jpg',
      isFavorite: false,
      isHighlighted: true,
    },
    {
      id: 4,
      title: 'Modern 3BHK Apartment',
      description: 'A modern and spacious 3-bedroom apartment.',
      location: 'Downtown, Cityville',
      price: 3000,
      amenities: ['Wi-Fi', 'Parking', 'Gym', 'Swimming Pool'],
      image: 'assets/sacramento-property-management-apartments.jpg',
      isFavorite: false,
      isHighlighted: true,
    },
  ];

  getApartments() {
    return [...this.apartments];
  }

  getHighlightedApartments() {
    return this.apartments.filter((apt) => apt.isHighlighted);
  }

  toggleFavorite(id: number) {
    const apartment = this.apartments.find((apt) => apt.id === id);
    if (apartment) {
      apartment.isFavorite = !apartment.isFavorite;
    }
  }

  addApartment(newApartment: any) {
    const newId = this.apartments.length + 1;
    this.apartments.push({
      id: newId,
      ...newApartment,
      image: newApartment.image || 'assets/default.jpg', // Use uploaded image or default
    });
  }

}
