import { CreateOrderDTO } from "../dtos/order.dto";

export class Order {
  orderId?: number;
  customerId: number;
  items: any[];
  totalAmount: number;
  createdAt?: Date;

  constructor(dto: CreateOrderDTO) {
    this.customerId = dto.customerId;
    this.items = dto.items;
    this.totalAmount = dto.totalAmount;
  }
}
