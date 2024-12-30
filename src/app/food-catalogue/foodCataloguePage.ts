import { Restaurant } from "../restaurant-listing/restaurant";
import { FoodItem } from "./foodItem";

export interface FoodCataloguePage{
    foodItemsList:FoodItem[];
    restaurant:Restaurant;
}