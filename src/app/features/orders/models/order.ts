import { OrderItem } from './order-item';

export interface Order {
  id?: string;
  status?: number;
  statusDescription?: string;
  totalAmount?: number;
  createdAt?: any;
  items: OrderItem[];
}
