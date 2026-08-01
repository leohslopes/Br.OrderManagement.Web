import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product-service';
import { ProductForm } from '../product-form/product-form';
import { MessageService } from '../../../../shared/services/message-service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductForm],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {


  private productService = inject(ProductService);
  private readonly messageService = inject(MessageService);

  public products: Product[] = [];
  public showModal = false;
  public selectedProduct!: Product;
  public showDeleteModal = false;
  public productToDelete: Product | null = null;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: response => {

        this.products = [...response];

        console.log('Response:', response);
        console.log('Products:', this.products);

        setTimeout(() => {
          console.log('Depois de 1 segundo:', this.products);
        }, 1000);

      }
    });
  }

  trackById(index: number, item: Product): string | number {
    return item.id ?? index;
  }

  newProduct() {
    this.selectedProduct = {
      id: '',
      name: '',
      description: '',
      price: 0,
      stockQuantity: 0,
      imageBase64: ''
    } as Product;

    this.showModal = true;
  }

  edit(product: Product) {
    this.selectedProduct = { ...product };
    this.showModal = true;
  }

  delete(product: Product): void {
    this.productToDelete = product;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }

  confirmDelete(): void {
    if (!this.productToDelete?.id) {
      return;
    }

    this.productService.delete(this.productToDelete.id).subscribe({
      next: () => {
        this.messageService.success('Produto excluído com sucesso.');

        this.cancelDelete();
        this.loadProducts();
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.loadProducts();
  }

}