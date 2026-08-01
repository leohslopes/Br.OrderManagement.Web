import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product-service';
import { MessageService } from '../../../../shared/services/message-service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductForm {

  private service = inject(ProductService);
  private readonly messageService = inject(MessageService);

  @Input()
  public visible = false;
  @Input()
  public product!: Product;
  @Output()
  public close = new EventEmitter<void>();
  @Output()
  public saved = new EventEmitter<void>();
  public previewImage: string | null = null;

  ngOnChanges(): void {
    if (this.product?.imageBase64) {
      this.previewImage = 'data:image/png;base64,' + this.product.imageBase64;
    } else {
      this.previewImage = null;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (!file)
      return;

    const reader = new FileReader();

    reader.onload = () => {
      this.previewImage = reader.result as string;
      this.product.imageBase64 = this.previewImage.split(',')[1];
    };

    reader.readAsDataURL(file);
  }

  save(): void {
    if (!this.product.name?.trim()) {
      this.messageService.warning('Informe o nome do produto.');
      return;
    }

    if (this.product.price <= 0) {
      this.messageService.warning('Informe um preço maior que zero.');
      return;
    }

    if (this.product.stockQuantity < 0) {
      this.messageService.warning('O estoque não pode ser negativo.');
      return;
    }

    if (this.product.id) {
      this.updateProduct();
      return;
    }

    this.createProduct();
  }

  private createProduct(): void {
    this.service.create(this.product).subscribe({
      next: () => {
        this.messageService.success('Produto cadastrado com sucesso.');

        this.saved.emit();
        this.close.emit();
      }
    });
  }

  private updateProduct(): void {
    this.service.update(this.product).subscribe({
      next: () => {
        this.messageService.success('Produto atualizado com sucesso.');

        this.saved.emit();
        this.close.emit();
      }
    });
  }

  cancel(): void {
    this.close.emit();
  }


}