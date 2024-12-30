import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from './foodItem.service';
import { FoodCataloguePage } from './foodCataloguePage';
import { FoodItem } from './foodItem';

@Component({
  selector: 'app-food-catalogue',
  imports: [CommonModule],
  templateUrl: './food-catalogue.component.html',
  styleUrl: './food-catalogue.component.css'
})
export class FoodCatalogueComponent {
  restaurantId: number;
  foodItemResponse: FoodCataloguePage;
  foodItemCart: FoodItem[]=[];
  orderSummary: FoodCataloguePage;
  
  constructor(private route: ActivatedRoute, private foodItemService: FoodItemService, private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const restaurantId = params.get('id'); // Get the 'id' parameter from the route
  
      if (restaurantId !== null) {  // Check if restaurantId is not null
        this.restaurantId = +restaurantId; // Convert the 'id' to a number
        this.getFoodItemsByRestaurant(this.restaurantId); // Use the valid restaurantId
      } else {
        console.error('Restaurant ID is missing in the route');
      }
    });
  }
  getFoodItemsByRestaurant(restaurant: number) {
    this.foodItemService.getFoodItemsByRestaurant(restaurant).subscribe(
      data => {
        this.foodItemResponse = data;
      }
    )
  }
 
  increment(food: any) {
    food.quantity++;
    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    if (index === -1) {
      // If record does not exist, add it to the array
      this.foodItemCart.push(food);
    } else {
      // If record exists, update it in the array
      this.foodItemCart[index] = food;
    }
  }

  decrement(food: any) {
    if (food.quantity > 0) {
      food.quantity--;

      const index = this.foodItemCart.findIndex(item => item.id === food.id);
      if (this.foodItemCart[index].quantity == 0) {
        this.foodItemCart.splice(index, 1);
      } else {
        // If record exists, update it in the array
        this.foodItemCart[index] = food;
      }

    }
  }
  onCheckOut() {
    this.foodItemCart;
    this.orderSummary = {
      foodItemsList: [],
      restaurant: {
        id: 0,
        name: '',
        address: '',
        city: '',
        restaurantDescription: ''
    }
    }
    this.orderSummary.foodItemsList = this.foodItemCart;
    this.orderSummary.restaurant = this.foodItemResponse.restaurant;
    this.router.navigate(['/orderSummary'], { queryParams: { data: JSON.stringify(this.orderSummary) } });
  }


}
