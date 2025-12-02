import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialOrderMigration1764592794516 implements MigrationInterface {
    name = 'InitialOrderMigration1764592794516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('pending', 'processing', 'completed', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "orders" ("orderId" SERIAL NOT NULL, "customerId" integer NOT NULL, "items" jsonb NOT NULL, "totalAmount" numeric(10,2) NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_41ba27842ac1a2c24817ca59eaa" PRIMARY KEY ("orderId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e5de51ca888d8b1f5ac25799dd" ON "orders" ("customerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_775c9f06fc27ae3ff8fb26f2c4" ON "orders" ("status") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_775c9f06fc27ae3ff8fb26f2c4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e5de51ca888d8b1f5ac25799dd"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    }

}
