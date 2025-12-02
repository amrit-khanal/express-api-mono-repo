import { Repository } from "typeorm";
import { AppDataSource } from "../datasource";
import { OrderEntity } from "../entities/order.entity";
import { IOrderRepository } from "../../../business/repositories/order.repository";

export default class OrderRepositoryImpl extends IOrderRepository {
  private repo: Repository<OrderEntity>;

  constructor() {
    super();
    this.repo = AppDataSource.getRepository(OrderEntity);
  }

  async create(orderDto: Partial<OrderEntity>): Promise<OrderEntity> {
    const order = this.repo.create(orderDto);
    return await this.repo.save(order);
  }

  async createMany(orderDtos: Partial<OrderEntity>[]): Promise<OrderEntity[]> {
    const orders = this.repo.create(orderDtos);
    return await this.repo.save(orders);
  }

  async findAll(page = 1, limit = 20, cursor?: number): Promise<OrderEntity[]> {
    const query = this.repo.createQueryBuilder("order")
      .orderBy("order.orderId", "DESC")
      .take(limit);

    if (cursor) {
      query.where("order.orderId < :cursor", { cursor });
    } else {
      query.skip((page - 1) * limit);
    }

    return await query.getMany();
  }
  async findOneById(id: number): Promise<OrderEntity> {
    return await this.repo.findOne({ where: { orderId: id } });
  }

  async search(q: string, page = 1, limit = 20): Promise<OrderEntity[]> {
    return await this.repo
      .createQueryBuilder("order")
      .where(
        "CAST(order.orderId AS text) ILIKE :q OR CAST(order.customerId AS text) ILIKE :q",
        { q: `%${q}%` }
      )
      .orderBy("order.orderId", "DESC")
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }


  async getStats() {
    const result = await this.repo
      .createQueryBuilder("order")
      .select("COUNT(order.orderId)", "totalOrders")
      .addSelect("COALESCE(SUM(order.totalAmount),0)", "totalAmount")
      .getRawOne();
    return result;
  }
}
