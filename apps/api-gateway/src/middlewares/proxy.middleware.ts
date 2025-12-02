import { Request, Response, NextFunction } from "express";
import fastProxy from "fast-proxy-lite";
import { AllServiceRoutes } from "../routes/service-routes.provider";

const { proxy } = fastProxy();

export const proxyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqPath = req.path.replace(/\/$/, "");

  // Match the route
  let matchedRoute: any = null;
  for (const route of Object.values(AllServiceRoutes)) {
    const source = route.source.replace(/\/$/, "");
    const pattern = source.replace(/:[^/]+/g, "([^/]+)");
    const regex = new RegExp(`^${pattern}(\\?.*)?$`);
    if (regex.test(reqPath)) {
      matchedRoute = route;
      break;
    }
  }

  if (!matchedRoute) return next();

  let baseUrl = matchedRoute.baseUrl || "";
  baseUrl = baseUrl.replace(/\/$/, ""); 
  let targetUrl = baseUrl + matchedRoute.target;

  targetUrl = targetUrl.replace(/([^:]\/)\/+/g, "$1");

  const sourceParts = matchedRoute.source.split("/").filter(Boolean);
  const pathParts = req.path.split("/").filter(Boolean);
  sourceParts.forEach((part, idx) => {
    if (part.startsWith(":")) {
      targetUrl = targetUrl.replace(`:${part.slice(1)}`, pathParts[idx]);
    }
  });

  console.log(` Proxying ${req.method} ${req.path} → ${targetUrl}`);

  try {
    await proxy(req, res, targetUrl);
  } catch (err) {
    res.status(502).json({ error: "Proxy Failed", details: `${err}` });
  }
};
