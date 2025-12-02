import { IGenericRepository } from "core/core/infrastructure/core.repository";
import { Order } from "../entities/order.entity";
import { CreateOrderDTO } from "../dtos/order.dto";

export abstract class IOrderRepository extends IGenericRepository<Order> {
  createMany(dtos: CreateOrderDTO[]) {
    throw new Error("Method not implemented.");
  }
  abstract findOneById(id: number): Promise<Order>;
  abstract getStats(): Promise<any>;
  abstract search(q: string, page: number, limit: number): Promise<any>;
  abstract findAll(page: number, limit: number, cursor:number): Promise<any>;
}
