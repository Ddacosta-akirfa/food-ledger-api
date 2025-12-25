import { PaymentMethod } from "../../../generated/prisma/enums.js";

export interface CreatePurchaseDTO {
  userId: string;
  categoryId: string;

  date: Date;
  product: string;
  quantity: number;
  unitPrice: number;
  paymentMethod: PaymentMethod;

  notes?: string;
}
