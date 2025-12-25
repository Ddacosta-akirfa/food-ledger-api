import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../../generated/prisma/client.js";
import {
  CategorySummaryDTO,
  MonthlySummaryDTO,
} from "../dto/MonthlySummaryDto.js";
import { PurchaseDTO } from "../dto/PurchaseDto.js";
import { IPurchaseRepository } from "./IPurchaseRepository.js";
import { CreatePurchasePersistenceDTO } from "../dto/CreatePurchasePersistenceDTO.js";

// const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

export class PurchaseRepository implements IPurchaseRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreatePurchasePersistenceDTO): Promise<PurchaseDTO> {
    const purchase = await this.prisma.purchase.create({
      data: {
        userId: data.userId,
        categoryId: data.categoryId,
        date: data.purchaseDate,

        product: data.product,
        quantity: data.quantity,
        unitPrice: data.unitPrice,
        total: data.total,
        paymentMethod: data.paymentMethod,

        notes: data.notes!,
      },
    });

    return {
      id: purchase.id,
      purchaseDate: purchase.date,
      product: purchase.product,
      quantity: purchase.quantity,
      unitPrice: purchase.unitPrice,
      total: purchase.total,
      paymentMethod: purchase.paymentMethod,

      notes: purchase.notes ?? "",

      userId: purchase.userId,
      categoryId: purchase.categoryId,
    };
  }

  async findAll(userId: string): Promise<PurchaseDTO[]> {
    const purchases = await this.prisma.purchase.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    return purchases.map((purchase) => ({
      id: purchase.id,
      purchaseDate: purchase.date,
      product: purchase.product,
      quantity: purchase.quantity,
      unitPrice: purchase.unitPrice,
      total: purchase.total,
      paymentMethod: purchase.paymentMethod,

      notes: purchase.notes ?? "",

      userId: purchase.userId,
      categoryId: purchase.categoryId,
    }));
  }

  async findByMonth(
    userId: string,
    year: number,
    month: number
  ): Promise<PurchaseDTO[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const purchases = await this.prisma.purchase.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return purchases.map((purchase) => ({
      id: purchase.id,
      product: purchase.product,
      quantity: purchase.quantity,
      total: purchase.total,
      userId: purchase.userId,
      notes: purchase.notes ?? "",
      unitPrice: purchase.unitPrice,
      purchaseDate: purchase.date,
      categoryId: purchase.categoryId,
      paymentMethod: purchase.paymentMethod,
    }));
  }

  async getMonthlySummary(
    userId: string,
    year: number,
    month: number
  ): Promise<MonthlySummaryDTO> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const totalResult = await this.prisma.purchase.aggregate({
      _sum: {
        unitPrice: true,
      },
      where: {
        userId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    // Total por categoria
    const byCategoryRaw = await this.prisma.purchase.groupBy({
      by: ["categoryId"],
      _sum: {
        unitPrice: true,
      },
      where: {
        userId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    const byCategory: CategorySummaryDTO[] = byCategoryRaw.map((item) => ({
      categoryId: item.categoryId,
      total: item._sum.unitPrice ?? 0,
    }));

    return {
      total: totalResult._sum.unitPrice ?? 0,
      byCategory: byCategory,
    };
  }
}
