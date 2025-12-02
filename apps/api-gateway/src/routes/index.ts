import express from "express";
import { AllServiceRoutes } from "./service-routes.provider";

const router = express.Router();
Object.values(AllServiceRoutes).forEach((route) => {
  router.all(route.source, (req, res) => {
    res.json({ source: route.source, target: route.target });
  });
});

export default router;
