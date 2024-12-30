import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Restaurant } from './restaurant';
import { Router } from '@angular/router';
import { RestaurantService } from './retaurant.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-restaurant-listing',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './restaurant-listing.component.html',
  styleUrl: './restaurant-listing.component.css'
})
export class RestaurantListingComponent {
getRandomImage() {
  const imageCount = 4; // Adjust this number based on the number of images in your asset folder
  const randomIndex = this.getRandomNumber(1, imageCount);
  return `${randomIndex}.jpg`;
}
getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 public restaurantList: Restaurant[];

  ngOnInit() {
  this.getAllRestaurants();
}
constructor(private router: Router, private restaurantService: RestaurantService) { }

getAllRestaurants() {
  this.restaurantService.getAllRestaurants().subscribe(
    data => {
      this.restaurantList = data;
    }
  )
}

  OnClick(id: number) {
      this.router.navigate(['/food-catalogue', id]);
    }
}
