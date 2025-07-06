import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteClinicsService {

  constructor() {}

  // Method to add a clinic to favorites a specific user in local storage
  addClinicToFavorites(userId: number, clinicId: number): void {
    const favoritesKey = `favorites_${userId}`;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');

    if (!favorites.includes(clinicId)) {
      favorites.push(clinicId);
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    }
  }

  // Method to remove a clinic from favorites a specific user in local storage
  removeClinicFromFavorites(userId: number, clinicId: number): void {
    const favoritesKey = `favorites_${userId}`;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');

    const index = favorites.indexOf(clinicId);
    if (index > -1) {
      favorites.splice(index, 1);
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    }
  }

  // Method to get all favorite clinics for a specific user from local storage
  getFavoriteClinics(userId: number): string[] {
    const favoritesKey = `favorites_${userId}`;
    return JSON.parse(localStorage.getItem(favoritesKey) || '[]');
  }

  // Method to check if a clinic is in favorites for a specific user
  isClinicFavorite(userId: number, clinicId: number): boolean {
    const favoritesKey = `favorites_${userId}`;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
    return favorites.includes(clinicId);
  }


}
