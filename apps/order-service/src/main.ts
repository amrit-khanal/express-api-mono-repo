import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv"; 
import orderRoutes from "./routes/order.routes"; 

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.json({ status: "Order Service running" });
});

app.use("/api/orders", orderRoutes);

const PORT = process.env.ORDER_SERVICE_PORT || 3001;

app.listen(PORT, () =>
  console.log(`Order Service running on port ${PORT}`)
);
