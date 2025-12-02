import { Request, Response } from "express";
import { OrderUseCase } from "../application/usecases/order.usecase";
import OrderRepository from "../frameworks/database/repositories/order.repository.impl";

const orderUseCase = new OrderUseCase(new OrderRepository());

  export class OrderController {
  static async create(req: Request, res: Response) {
    const body = req.body;
    console.log("check body",Array.isArray(body))
    if (Array.isArray(body)) {
      const response = await orderUseCase.createOrdersBatch(body);
      return res.json(response);
    }
    const response = await orderUseCase.createOrder(body);
    return res.json(response);
  }


  static async getAll(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const response = await orderUseCase.getOrders(page, limit);
    res.json(response);
  }

static async getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  console.log(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid order ID" });
  }
  const response = await orderUseCase.getOrderById(id);
  res.json(response);
}


  static async stats(req: Request, res: Response) {
    const response = await orderUseCase.getOrderStats();
    res.json(response);
  }

  static async search(req: Request, res: Response) {
    const q = (req.query.q as string) ?? "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const response = await orderUseCase.searchOrders(q, page, limit);
    res.json(response);
  }
}
