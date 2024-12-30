import { FoodItem } from "../food-catalogue/foodItem";
import { Restaurant } from "../restaurant-listing/restaurant";

export interface OrderDTO{

    foodItemsList?: FoodItem[];
    userId?: number;
    restaurant?: Restaurant;
}