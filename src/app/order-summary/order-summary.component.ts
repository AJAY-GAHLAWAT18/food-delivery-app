import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from './order.service';
import { OrderDTO } from './OrderDTO';

@Component({
  selector: 'app-order-summary',
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
  orderSummary?: OrderDTO;
  obj: any;
  total?: any;
  showDialog: boolean = false;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) { }
  
  ngOnInit() {
    const data = this.route.snapshot.queryParams['data'];
    this.obj = JSON.parse(data);
    this.obj.userId=2;
    this.orderSummary = this.obj;
    
    this.total = Array.isArray(this.orderSummary?.foodItemsList)
    ? this.orderSummary.foodItemsList.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.quantity * (currentValue.price??0));
    }, 0) : 0;

  }

  saveOrder() {
    this.orderService.saveOrder(this.orderSummary)
      .subscribe(
        response => {
            this.showDialog = true;
        },
        error => {
          console.error('Failed to save data:', error);
        }
      );
  }

  closeDialog() {
    this.showDialog = false;
    this.router.navigate(['/']); // Replace '/home' with the actual route for your home page
  }

}