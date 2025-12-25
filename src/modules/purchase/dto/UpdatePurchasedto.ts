export interface UpdatePurchaseDto {
  categoryId: number;
  paymentMethodId: number;

  description?: string;
  amount?: number;
  purchaseDate?: Date;
}
