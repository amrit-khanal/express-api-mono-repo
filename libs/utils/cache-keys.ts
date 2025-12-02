export const CacheKeys = {
  ORDERS_STATS: "orders_stats",
  ordersPage: (page: number, limit: number) => `orders_page_${page}_limit_${limit}`,
  orderById: (id: number) => `order_${id}`,
};
