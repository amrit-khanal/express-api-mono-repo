import { ResponseData } from "libs/utils/response.utils";
import { CreateOrderDTO } from "../../business/dtos/order.dto";
import { IOrderRepository } from "../../business/repositories/order.repository";
import { redisCache } from "libs/utils/redis.utils";
import { CacheKeys } from "libs/utils/cache-keys";

export class OrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) { }

  async createOrder(dto: CreateOrderDTO) {
    if (!dto.items?.length) {
      return ResponseData("Validation failed", null, false, {
        items: "Order items required",
      });
    }

    const order = await this.orderRepository.create(dto);

    await redisCache.del(CacheKeys.ORDERS_STATS);

    return ResponseData("Order created successfully", order, true, null);
  }

  async createOrdersBatch(dtos: CreateOrderDTO[]) {
    const orders = await this.orderRepository.createMany(dtos);

    await redisCache.del(CacheKeys.ORDERS_STATS);

    for (let page = 1; page <= 100; page++) {
      await redisCache.del(CacheKeys.ordersPage(page, 20));
    }

    return ResponseData("Orders created successfully", { orders }, true, null);
  }

  async getOrders(page = 1, limit = 20, cursor?: number) {
    const cacheKey = CacheKeys.ordersPage(page, limit);
    const cached = await redisCache.get(cacheKey);

    if (cached)
      return ResponseData(
        "Orders fetched successfully (cached)",
        JSON.parse(cached as string),
        true,
        null
      );

    const data = await this.orderRepository.findAll(page, limit, cursor);
    await redisCache.set(cacheKey, JSON.stringify(data));
    return ResponseData("Orders fetched successfully", data, true, null);
  }

  async getOrderById(id: number) {
    console.log(id)
    // const cacheKey = CacheKeys.orderById(id);
    // const cached = await redisCache.get(cacheKey);
    // if (cached)
    //   return ResponseData(
    //     "Order fetched (cached)",
    //     JSON.parse(cached as string),
    //     true,
    //     null
    //   );

    const order = await this.orderRepository.findOneById(id);
    // await redisCache.set(cacheKey, JSON.stringify(order));
    return ResponseData("Order fetched", order, true, null);
  }

  async searchOrders(q: string, page = 1, limit = 20) {
    const data = await this.orderRepository.search(q, page, limit);
    return ResponseData("Search results", data, true, null);
  }

  async getOrderStats() {
    const cacheKey = CacheKeys.ORDERS_STATS;
    const cached = await redisCache.get(cacheKey);
    if (cached)
      return ResponseData(
        "Stats fetched (cached)",
        JSON.parse(cached as string),
        true,
        null
      );

    const stats = await this.orderRepository.getStats();
    await redisCache.set(cacheKey, JSON.stringify(stats));
    return ResponseData("Stats fetched", stats, true, null);
  }
}
