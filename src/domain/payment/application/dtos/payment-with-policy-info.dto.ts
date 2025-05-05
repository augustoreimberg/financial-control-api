import { EnumPaymentStatus } from '@prisma/client';

export interface PaymentWithPolicyInfo {
  id: string;
  policyId: string;
  accountId: string;
  accountName: string;
  productId: string;
  productName: string;
  plot: string;
  price: number;
  paymentStatus: EnumPaymentStatus;
  parentId?: string;
  dueDate: Date;
  paymentDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
}
