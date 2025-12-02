# Express Microservices with lean architecure Example

Simple monorepo with two microservices + API Gateway + Clean Architecure built in Node.js / Express / TypeScript.

- **order-service** → creates and manages orders  
- **realtime-service** → ingests data fast, processes it in background, pushes live updates via WebSocket  
- **api-gateway** → single entry point, routes everything to the right service  

## Tech Stack
- Node.js + Express
- TypeScript
- TypeORM + PostgreSQL
- Redis (caching + Bull queues)
- RabbitMQ (message broker)
- WebSocket (socket.io)
- Npm or Yarn workspaces (monorepo)

## Quick start

```bash
# 1. Clone & install
git clone repo
cd express-api-mono-repo
yarn install



# 2. Copy env files (or just rename the .example ones)
cp apps/order-service/.env.example apps/order-service/.local.env
cp apps/realtime-service/.env.example apps/realtime-service/.local.env
cp apps/api-gateway/.env.example apps/api-gateway/.local.env

# 3. Generate migrations
npm run  order-service:migration:generate  --name = "name of migration"
npm run realtime-service:migration:generate --name="name of migration "

# 4. Run migrations
npm run  order-service:migration:run
npm run realtime-service:migration:run

# 5. Start all services
yarn start:all
# or start individually:
yarn start:api-gateway
yarn start:order
yarn start:realtime