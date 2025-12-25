import { CreatePurchaseDTO } from "../dto/CreatePurchaseDto.js";
import { CreatePurchasePersistenceDTO } from "../dto/CreatePurchasePersistenceDTO.js";
import { MonthlySummaryDTO } from "../dto/MonthlySummaryDto.js";
import { PurchaseDTO } from "../dto/PurchaseDto.js";
import { UpdatePurchaseDTO } from "../dto/UpdatePurchasedto.js";
import { IPurchaseRepository } from "../repository/IPurchaseRepository.js";

export class PurchaseService {
  constructor(private readonly purchaseRepository: IPurchaseRepository) {}

  async createPurchase(
    data: CreatePurchasePersistenceDTO
  ): Promise<PurchaseDTO> {
    if (!data.userId) throw new Error("Id usuário é requeriod");

    if (data.quantity <= 0)
      throw new Error("Quantidade deve ser maior que zero");

    if (!data.categoryId) throw new Error("Id Categoria é requerido");

    if (!data.paymentMethod) throw new Error("Método de Pagamento é requerido");

    if (!data.notes) throw new Error("Notas é requerida");

    if (data.unitPrice <= 0)
      throw new Error("Preço unitário deve ser maior que zero");

    if (!data.date) throw new Error("Purchase date is required");

    const total = data.unitPrice * data.quantity;

    const purchase = this.purchaseRepository.create({
      ...data,
      total,
    });

    return purchase;
  }

  async findAll(userId: string): Promise<PurchaseDTO[]> {
    if (!userId) throw new Error("Id usuário é requerido");

    const purchases = await this.purchaseRepository.findAll(userId);
    return purchases;
  }

  async findByMonth(
    userId: string,
    year: number,
    month: number
  ): Promise<PurchaseDTO[]> {
    if (!userId) throw new Error("Id usuário é requerido");

    if (month < 1 || month > 12) throw new Error("Mês deve estar entre 1 e 12");

    const purchases = await this.purchaseRepository.findByMonth(
      userId,
      year,
      month
    );

    return purchases;
  }

  async getMonthlySummary(
    userId: string,
    year: number,
    month: number
  ): Promise<MonthlySummaryDTO> {
    if (!userId) throw new Error("Id usuário é requerido");

    if (month < 1 || month > 12) throw new Error("Mês deve estar entre 1 e 12");

    const monthlySummary = await this.purchaseRepository.getMonthlySummary(
      userId,
      year,
      month
    );
    return monthlySummary;
  }

  async updatePurchase(
    purchaseId: string,
    data: UpdatePurchaseDTO
  ): Promise<PurchaseDTO> {
    const existPurchase = await this.purchaseRepository.findById(purchaseId);

    if (!existPurchase) throw new Error("Compra não encontrada");

    const quantity = data.quantity ?? existPurchase.quantity;
    const unitPrice = data.unitPrice ?? existPurchase.unitPrice;

    if (quantity <= 0) throw new Error("Quantidade deve ser maior que zero");

    if (unitPrice <= 0)
      throw new Error("Preço unitário deve ser maior que zero");

    const total = unitPrice * quantity;

    const updatedPurchase = await this.purchaseRepository.update(purchaseId, {
      ...data,
      total,
    });

    return updatedPurchase;
  }
}
