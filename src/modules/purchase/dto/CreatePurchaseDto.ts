export interface CreatePurchaseDto {
  userId: number;
  categoryId: number;
  paymentMethodId: number;

  description: string;
  amount: number;
  purchaseDate: Date;
}
