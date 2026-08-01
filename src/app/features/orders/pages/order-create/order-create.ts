import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Product } from '../../../products/models/product';
import { ProductService } from '../../../products/services/product-service';

import { CreateOrder } from '../../models/create-order';
import { OrderItem } from '../../models/order-item';
import { OrderService } from '../../services/order-service';

import { MessageService } from '../../../../shared/services/message-service';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './order-create.html',
  styleUrl: './order-create.css'
})
export class OrderCreate implements OnInit {

  products: Product[] = [];

  selectedProductId = '';
  selectedQuantity = 1;

  items: OrderItem[] = [];

  isSaving = false;

  constructor(
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: response => {
        this.products = [...response];
      }
    });
  }

  addItem(): void {
    if (!this.selectedProductId) {
      this.messageService.warning('Selecione um produto.');
      return;
    }

    if (this.selectedQuantity <= 0) {
      this.messageService.warning('Informe uma quantidade maior que zero.');
      return;
    }

    const product = this.products.find(
      item => item.id === this.selectedProductId
    );

    if (!product) {
      this.messageService.warning('Produto não encontrado.');
      return;
    }

    if (product.stockQuantity <= 0) {
      this.messageService.warning(`O produto "${product.name}" está sem estoque.`);
      return;
    }

    const existingItem = this.items.find(item => item.productId === product.id);

    const currentQuantity = existingItem?.quantity ?? 0;
    const newQuantity = currentQuantity + this.selectedQuantity;

    if (newQuantity > product.stockQuantity) {
      this.messageService.warning(`A quantidade informada ultrapassa o estoque disponível de ${product.stockQuantity} unidade(s).`);

      return;
    }

    if (existingItem) {
      existingItem.quantity = newQuantity;
      existingItem.totalPrice =
        existingItem.quantity * (existingItem.unitPrice ?? 0);

      this.items = [...this.items];
    } else {
      this.items = [
        ...this.items,
        {
          productId: product.id!,
          productName: product.name,
          quantity: this.selectedQuantity,
          unitPrice: product.price,
          totalPrice: product.price * this.selectedQuantity,
          stockQuantity: product.stockQuantity
        }
      ];
    }

    this.resetItemForm();
  }

  increaseQuantity(item: OrderItem): void {
    const stockQuantity = item.stockQuantity ?? 0;

    if (item.quantity + 1 > stockQuantity) {
      this.messageService.warning(`O estoque disponível para "${item.productName}" é de ${stockQuantity} unidade(s).`);
      return;
    }

    item.quantity++;
    item.totalPrice = item.quantity * (item.unitPrice ?? 0);

    this.items = [...this.items];
  }

  decreaseQuantity(item: OrderItem): void {
    if (item.quantity <= 1) {
      return;
    }

    item.quantity--;
    item.totalPrice = item.quantity * (item.unitPrice ?? 0);

    this.items = [...this.items];
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(
      item => item.productId !== productId
    );
  }

  calculateTotal(): number {
    return this.items.reduce(
      (total, item) => total + (item.totalPrice ?? 0),
      0
    );
  }

  save(): void {
    if (this.items.length === 0) {
      this.messageService.warning('Adicione pelo menos um item ao pedido.');
      return;
    }

    const request: CreateOrder = {
      items: this.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    this.isSaving = true;

    this.orderService.create(request).subscribe({
      next: () => {
        this.messageService.success('Pedido criado com sucesso.');

        this.router.navigate(['/orders']);
      },
      error: () => {
        this.isSaving = false;
      },
      complete: () => {
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/orders']);
  }

  trackByProductId(
    index: number,
    item: OrderItem
  ): string | number {
    return item.productId || index;
  }

  private resetItemForm(): void {
    this.selectedProductId = '';
    this.selectedQuantity = 1;
  }
}