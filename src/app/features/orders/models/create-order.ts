export interface CreateOrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrder {
  items: CreateOrderItem[];
}