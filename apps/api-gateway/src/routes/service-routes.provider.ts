import { OrderRoutes } from "./order.routes";
import { DataRoutes } from "./data.routes";

const allRoutes = [
  ...OrderRoutes,
  ...DataRoutes,
];

export const AllServiceRoutes = allRoutes.reduce((acc, route) => {
  acc[route.source] = route;
  return acc;
}, {} as Record<string, any>);
