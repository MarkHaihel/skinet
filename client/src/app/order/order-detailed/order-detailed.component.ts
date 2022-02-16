import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrderService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order: IOrder;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private bc: BreadcrumbService) {
    this.bc.set('@orderDetailed', ' ');
  }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    this.orderService.getOrderDetailed(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(order => {
        this.order = order;
        this.bc.set('@orderDetailed', `Order# ${order.id} - ${order.status}`)
      }, error => {
        console.log(error);
      })
  }

}
