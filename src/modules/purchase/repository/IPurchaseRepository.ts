import { CreatePurchaseDto } from "../dto/CreatePurchaseDto.js";
import { MonthlySummaryDto } from "../dto/MonthlySummaryDto.js";
import { PurchaseDto } from "../dto/PurchaseDto.js";

export interface IPurchaseRepository {
  create(data: CreatePurchaseDto): Promise<PurchaseDto>;

  findAll(userId: string): Promise<PurchaseDto[]>;

  findByMonth(
    userId: string,
    year: number,
    month: number
  ): Promise<PurchaseDto[]>;

  getMonthlySummary(
    userId: string,
    year: number,
    month: number
  ): Promise<MonthlySummaryDto>;
}
