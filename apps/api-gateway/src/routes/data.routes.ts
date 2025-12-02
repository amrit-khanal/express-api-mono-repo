import * as dotenv from "dotenv";
import { RouteType } from "./types";
import { createServiceRoutes } from "./generic-service.routes";

dotenv.config({ path: "./apps/api-gateway/.api-gateway.local.env" });

const REALTIME_BASE_URL = process.env.REALTIME_SERVICE_ENDPOINT;
console.log("real time data base url",REALTIME_BASE_URL)

const dataRoutes: RouteType[] = [
  { source: "/data/ingest", target: "/api/data/ingest" },
  { source: "/data/stats", target: "/api/data/stats" },
  { source: "/data/history", target: "/api/data/history" },
];

export const DataRoutes = createServiceRoutes(REALTIME_BASE_URL, dataRoutes);
