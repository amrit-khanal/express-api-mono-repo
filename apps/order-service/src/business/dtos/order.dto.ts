export interface CreateOrderDTO {
  customerId: number;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
  totalAmount: number;
}

export interface SearchOrderDTO {
  q?: string;
  page?: number;
  limit?: number;
}
