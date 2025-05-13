import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/optional';
import type { EnumPaymentStatus } from '@prisma/client';

interface PaymentProps {
  policyId: string;
  plot: string;
  price: number;
  paymentStatus: EnumPaymentStatus;
  parentId?: string;
  dueDate: Date;
  paymentDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export class Payment extends Entity<PaymentProps> {
  static create(
    props: Optional<PaymentProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    const payment = new Payment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );

    return payment;
  }

  get policyId() {
    return this.props.policyId;
  }

  set policyId(policyId: string) {
    this.props.policyId = policyId;
    this.touch();
  }

  get plot() {
    return this.props.plot;
  }

  set plot(plot: string) {
    this.props.plot = plot;
    this.touch();
  }

  get price() {
    return this.props.price;
  }

  set price(price: number) {
    this.props.price = price;
    this.touch();
  }

  get paymentStatus() {
    return this.props.paymentStatus;
  }

  set paymentStatus(paymentStatus: EnumPaymentStatus) {
    this.props.paymentStatus = paymentStatus;
    this.touch();
  }

  get parentId() {
    return this.props.parentId;
  }

  set parentId(parentId: string | undefined) {
    this.props.parentId = parentId;
    this.touch();
  }

  get dueDate() {
    return this.props.dueDate;
  }

  set dueDate(dueDate: Date) {
    this.props.dueDate = dueDate;
    this.touch();
  }

  get paymentDate() {
    return this.props.paymentDate;
  }

  set paymentDate(paymentDate: Date | undefined) {
    this.props.paymentDate = paymentDate;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
