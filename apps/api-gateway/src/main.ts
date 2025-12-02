import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import { proxyMiddleware } from "./middlewares/proxy.middleware";

dotenv.config({ path: "./apps/api-gateway/.api-gateway.local.env" });

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.json({ status: "API Gateway is running" });
});

app.use("/api", proxyMiddleware);

const PORT = process.env.API_GATEWAY_PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
