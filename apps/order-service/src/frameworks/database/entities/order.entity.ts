import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, Index } from "typeorm";

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

@Entity("orders")
export class OrderEntity {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Index()
  @Column()
  customerId: number;

  @Column("jsonb")
  items: any[];

  @Column("decimal", { precision: 10, scale: 2 })
  totalAmount: number;

  @Index(["status"])
  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus; 

  @CreateDateColumn()
  createdAt: Date;
}
