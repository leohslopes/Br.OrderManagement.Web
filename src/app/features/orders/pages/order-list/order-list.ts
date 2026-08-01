import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Order } from '../../models/order';
import { OrderService } from '../../services/order-service';
import { MessageService } from '../../../../shared/services/message-service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css'
})
export class OrderList implements OnInit {

  public orders: Order[] = [];
  public isLoading = false;
  public selectedOrder: Order | null = null;
  public showItemsModal = false;

  constructor(
    private readonly orderService: OrderService,
    private readonly messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;

    this.orderService.getAll().subscribe({
      next: response => {
        this.orders = [...response];
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  confirm(order: Order): void {
    if (!order.id) {
      return;
    }

    this.orderService.confirm(order.id).subscribe({
      next: () => {
        this.messageService.success('Pedido confirmado com sucesso.');
        this.loadOrders();
      }
    });
  }

  cancel(order: Order): void {
    if (!order.id) {
      return;
    }

    this.orderService.cancel(order.id).subscribe({
      next: () => {
        this.messageService.success('Pedido cancelado com sucesso.');
        this.loadOrders();
      }
    });
  }

  finish(order: Order): void {
    if (!order.id) {
      return;
    }

    this.orderService.finish(order.id).subscribe({
      next: () => {
        this.messageService.success('Pedido finalizado com sucesso.');
        this.loadOrders();
      }
    });
  }

  canConfirm(order: Order): boolean {
    return order.status === 1;
  }

  canCancel(order: Order): boolean {
    return order.status === 1 || order.status === 2;
  }

  canFinish(order: Order): boolean {
    return order.status === 2;
  }

  getStatusDescription(order: Order): string {
    if (order.statusDescription) {
      return order.statusDescription;
    }

    switch (order.status) {
      case 1:
        return 'Criado';

      case 2:
        return 'Confirmado';

      case 3:
        return 'Cancelado';

      case 4:
        return 'Finalizado';

      default:
        return 'Desconhecido';
    }
  }

  getStatusClass(order: Order): string {
    switch (order.status) {
      case 1:
        return 'bg-secondary';

      case 2:
        return 'bg-primary';

      case 3:
        return 'bg-danger';

      case 4:
        return 'bg-success';

      default:
        return 'bg-dark';
    }
  }

  trackById(index: number, order: Order): string | number {
    return order.id ?? index;
  }

  viewItems(order: Order): void {
    this.selectedOrder = order;
    this.showItemsModal = true;
  }

  closeItemsModal(): void {
    this.showItemsModal = false;
    this.selectedOrder = null;
  }


}
