import { CreatePurchaseDto } from "../dto/CreatePurchaseDto.js";
import { PurchaseDto } from "../dto/PurchaseDto.js";
import { IPurchaseRepository } from "../repository/IPurchaseRepository.js";

export class PurchaseService {
  constructor(private purchaseRepository: IPurchaseRepository) {}

  async createPurchase(data: CreatePurchaseDto): Promise<PurchaseDto> {
    if (!data.userId) throw new Error("Id usuário é requeriod");
    if (!data.categoryId) throw new Error("Id Categoria é requerido");
    if (!data.paymentMethodId)
      throw new Error("Id Método de Pagamento é requerido");
    if (!data.description) throw new Error("Descrição é requerida");
    if (data.amount <= 0) throw new Error("Montante deve ser maior que zero");
    if (!data.purchaseDate) throw new Error("Purchase date is required");

    const purchase = this.purchaseRepository.create(data);

    return purchase;
  }
}
