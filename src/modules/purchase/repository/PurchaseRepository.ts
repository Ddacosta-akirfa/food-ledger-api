import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import {
  PaymentMethod,
  PrismaClient,
} from "../../../generated/prisma/client.js";
import {
  CategorySummaryDTO,
  MonthlySummaryDTO,
} from "../dto/MonthlySummaryDto.js";
import { PurchaseDTO } from "../dto/PurchaseDto.js";
import { IPurchaseRepository } from "./IPurchaseRepository.js";
import { CreatePurchasePersistenceDTO } from "../dto/CreatePurchasePersistenceDTO.js";
import { UpdatePurchaseDTO } from "../dto/UpdatePurchasedto.js";

// const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

export class PurchaseRepository implements IPurchaseRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreatePurchasePersistenceDTO): Promise<PurchaseDTO> {
    const purchase = await this.prisma.purchase.create({
      data: {
        userId: data.userId,
        categoryId: data.categoryId,
        date: data.date,

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
      date: purchase.date,
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

  async findById(purchaseId: string): Promise<PurchaseDTO | null> {
    const purchase = await this.prisma.purchase.findUnique({
      where: {
        id: purchaseId,
      },
    });
    if (!purchase) {
      return null;
    }

    return {
      id: purchase.id,
      date: purchase.date,
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
      date: purchase.date,
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
      date: purchase.date,
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

  async update(id: string, data: UpdatePurchaseDTO): Promise<PurchaseDTO> {
    const updateData: any = {};

    if (data.date !== undefined) updateData.date = data.date;
    if (data.product !== undefined) updateData.product = data.product;
    if (data.quantity !== undefined) updateData.quantity = data.quantity;
    if (data.unitPrice !== undefined) updateData.unitPrice = data.unitPrice;
    if (data.total !== undefined) updateData.total = data.total;
    if (data.paymentMethod !== undefined)
      updateData.paymentMethod = data.paymentMethod;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.categoryId !== undefined) {
      updateData.category = {
        connect: { id: data.categoryId },
      };
    }

    const updatedPurchase = await this.prisma.purchase.update({
      where: { id },
      data: updateData,
    });

    return {
      id: updatedPurchase.id,
      date: updatedPurchase.date,
      product: updatedPurchase.product,
      quantity: updatedPurchase.quantity,
      unitPrice: updatedPurchase.unitPrice,
      total: updatedPurchase.total,
      paymentMethod: updatedPurchase.paymentMethod,
      notes: updatedPurchase.notes ?? "",
      userId: updatedPurchase.userId,
      categoryId: updatedPurchase.categoryId,
    };
  }
}
