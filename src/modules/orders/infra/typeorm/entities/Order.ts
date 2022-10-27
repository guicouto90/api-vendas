import { IOrder } from './../../../domain/model/IOrder';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrdersProducts } from './OrdersProducts';
import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';

@Entity('orders')
export class Order implements IOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrdersProducts, orders_products => orders_products.order, {
    cascade: true,
  })
  orders_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
