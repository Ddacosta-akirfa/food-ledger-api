import { PaymentMethod } from "../../../generated/prisma/enums.js";

export interface PurchaseDTO {
  id: string;

  date: Date;
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
  paymentMethod: PaymentMethod;

  notes?: string;

  userId: string;
  categoryId: string;
}
