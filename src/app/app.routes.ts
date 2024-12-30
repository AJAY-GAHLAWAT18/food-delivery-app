import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RestaurantListingComponent } from './restaurant-listing/restaurant-listing.component';
import { FoodCatalogueComponent } from './food-catalogue/food-catalogue.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

export const routes: Routes = [
    { path:'',
        component:RestaurantListingComponent
    },
    { path:'food-catalogue/:id',
        component:FoodCatalogueComponent
    },
    { path:'orderSummary',
        component:OrderSummaryComponent
    }
];
