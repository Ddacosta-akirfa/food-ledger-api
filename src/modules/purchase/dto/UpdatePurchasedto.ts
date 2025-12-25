export interface UpdatePurchaseDTO {
  date?: Date;
  product?: string;
  quantity?: number;
  unitPrice?: number;
  paymentMethod?: string;
  notes?: string;
  categoryId?: string;
}
