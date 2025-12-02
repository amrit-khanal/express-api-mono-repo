import { RouteType } from "./types";

export const createServiceRoutes = (baseUrl: string, routes: RouteType[]) => {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, ""); 
  return routes.map(route => ({
    ...route,
    baseUrl: normalizedBaseUrl, 
    target: route.target.startsWith("http")
      ? route.target.replace(/^https?:\/\/[^/]+/, "")
      : route.target,
  }));
};
