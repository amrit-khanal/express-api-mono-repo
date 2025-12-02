import * as dotenv from "dotenv";
import { RouteType } from "./types";
import { createServiceRoutes } from "././generic-service.routes";

dotenv.config({ path: "./apps/api-gateway/.api-gateway.local.env" });

const ORDER_BASE_URL = process.env.ORDER_SERVICE_ENDPOINT;
console.log("order base url",ORDER_BASE_URL)


const orderRoutes: RouteType[] = [
  { source: "/orders", target: "/api/orders" },
  { source: "/orders/:id", target: "/api/orders/:id" },
  { source: "/orders/stats", target: "/api/orders/stats" },
  { source: "/orders/search", target: "/api/orders/search" }
];


export const OrderRoutes = createServiceRoutes(ORDER_BASE_URL, orderRoutes);
