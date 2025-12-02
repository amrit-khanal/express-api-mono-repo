import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

const router = Router();

router.get("/", OrderController.getAll);
router.get("/stats", OrderController.stats);
router.get("/search", OrderController.search);
router.get("/:id", OrderController.getById);
router.post("/", OrderController.create);

export default router;
