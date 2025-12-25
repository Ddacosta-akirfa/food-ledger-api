import { CreatePurchaseDTO } from "../dto/CreatePurchaseDto.js";
import { CreatePurchasePersistenceDTO } from "../dto/CreatePurchasePersistenceDTO.js";
import { MonthlySummaryDTO } from "../dto/MonthlySummaryDto.js";
import { PurchaseDTO } from "../dto/PurchaseDto.js";
import { UpdatePurchaseDTO } from "../dto/UpdatePurchasedto.js";

export interface IPurchaseRepository {
  create(data: CreatePurchasePersistenceDTO): Promise<PurchaseDTO>;

  findById(id: string): Promise<PurchaseDTO | null>;
  findAll(): Promise<PurchaseDTO[]>;

  findByMonth(
    userId: string,
    year: number,
    month: number
  ): Promise<PurchaseDTO[]>;

  getMonthlySummary(
    userId: string,
    year: number,
    month: number
  ): Promise<MonthlySummaryDTO>;

  update(id: string, data: UpdatePurchaseDTO): Promise<PurchaseDTO>;
}
