export interface PurchaseDto {
  id: string;
  description: string;
  amount: number;
  purchaseDate: Date;

  categoryId: string;
  paymentMethodId: string;
}
