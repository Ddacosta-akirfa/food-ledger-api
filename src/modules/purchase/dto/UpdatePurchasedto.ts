import { PaymentMethod } from "../../../generated/prisma/enums.js";

export interface UpdatePurchaseDTO {
  date?: Date;
  product?: string;
  quantity?: number;
  unitPrice?: number;
  total: number;
  paymentMethod?: PaymentMethod;
  notes?: string;
  categoryId?: string;
}
