import { PaymentMethod } from "../../../generated/prisma/enums.js";

export interface CreatePurchasePersistenceDTO {
  userId: string;
  categoryId: string;

  purchaseDate: Date;
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
  paymentMethod: PaymentMethod;

  notes?: string;
}
