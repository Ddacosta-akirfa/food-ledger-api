import { Request, Response } from "express";
import { PurchaseRepository } from "../repository/PurchaseRepository.js";
import { PurchaseService } from "../service/PurchaseService.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { ApiResponse } from "../../../shared/utils/ApiResponse.js";
import { PrismaClient } from "../../../generated/prisma/client.js";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const purchaseRepository = new PurchaseRepository(prisma);
const purchaseService = new PurchaseService(purchaseRepository);

export async function createPurchase(req: Request, res: Response) {
  try {
    const data = req.body;
    const purchase = await purchaseService.createPurchase(data);

    return ApiResponse.created(res, "Compra criada com sucesso", purchase);
  } catch (error: any) {
    return ApiResponse.error(res, error.message);
  }
}

export async function listAllPurchases(req: Request, res: Response) {
  try {
    const purchases = await purchaseService.findAll();

    return ApiResponse.success(
      res,
      "Compras recuperadas com sucesso",
      purchases
    );
  } catch (error: any) {
    return ApiResponse.error(res, error.message);
  }
}

export async function listPurchasesByMonth(req: Request, res: Response) {
  try {
    const userId = req.user!.sub;
    const { year, month } = req.query;

    const purchases = await purchaseService.findByMonth(
      userId,
      Number(year),
      Number(month)
    );

    return ApiResponse.success(
      res,
      "Compras recuperadas com sucesso",
      purchases
    );
  } catch (error: any) {
    return ApiResponse.error(res, error.message);
  }
}

export async function getMonthlySummary(req: Request, res: Response) {
  try {
    const userId = req.user!.sub;
    const { year, month } = req.query;

    const summary = await purchaseService.getMonthlySummary(
      userId,
      Number(year),
      Number(month)
    );

    return ApiResponse.success(
      res,
      "Resumo mensal recuperado com sucesso",
      summary
    );
  } catch (error: any) {
    return ApiResponse.error(res, error.message);
  }
}

export async function updatePurchase(req: Request, res: Response) {
  try {
    const purchaseId = req.params.id!;
    const data = req.body;
    const purchaseUpdated = await purchaseService.updatePurchase(
      purchaseId,
      data
    );

    return ApiResponse.success(
      res,
      "Compra actualizada com sucesso",
      purchaseUpdated
    );
  } catch (error: any) {
    return ApiResponse.error(res, error.message);
  }
}
