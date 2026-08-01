import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },

  // PRODUTOS
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/pages/product-list/product-list')
        .then(c => c.ProductList)
  },
  {
    path: 'products/new',
    loadComponent: () =>
      import('./features/products/pages/product-form/product-form')
        .then(c => c.ProductForm)
  },

  // PEDIDOS
  {
    path: 'orders',
    loadComponent: () =>
      import('./features/orders/pages/order-list/order-list')
        .then(c => c.OrderList)
  },
  {
    path: 'orders/new',
    loadComponent: () =>
      import('./features/orders/pages/order-create/order-create')
        .then(c => c.OrderCreate)
  },

  // Página não encontrada
  {
    path: '**',
    redirectTo: 'products'
  }
];