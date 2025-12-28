import { Request, Response } from "express";
import { ApiResponse } from "../../../shared/utils/ApiResponse.js";
import { CategoryService } from "../service/category.service.js";
import { CategoryRepository } from "../repository/category.repository.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../../generated/prisma/client.js";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const categoryRepository = new CategoryRepository(prisma);
const categoryService = new CategoryService(categoryRepository);

export async function createCategory(req: Request, res: Response) {
  try {
    const data = req.body;
    const categoria = await categoryService.create(data);

    return ApiResponse.success(res, "Categoria criada com sucesso", categoria);
  } catch (error: any) {
    return ApiResponse.error(res, error.message);
  }
}

export async function getCategoryById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return ApiResponse.error(res, "Id da categoria é obrigatório", 400);
    }

    const category = await categoryService.findById(id);

    return ApiResponse.success(
      res,
      "Categoria recuperada com sucesso",
      category
    );
  } catch (error: any) {
    return ApiResponse.error(res, error.message);
  }
}

export async function listCategories(req: Request, res: Response) {
  try {
    const categories = await categoryService.findAll();

    return ApiResponse.success(
      res,
      "Categorias recuperadas com sucesso",
      categories
    );
  } catch (error: any) {
    return ApiResponse.error(res, error.message);
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return ApiResponse.error(res, "Id da categoria é obrigatório", 400);
    }

    const category = await categoryService.update(id, req.body);

    return ApiResponse.success(
      res,
      "Categoria actualizada com sucesso",
      category
    );
  } catch (error: any) {
    return ApiResponse.error(res, error.message);
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return ApiResponse.error(res, "Id da categoria é obrigatório", 400);
    }

    const category = await categoryService.delete(id);

    return ApiResponse.success(res, "Categoria apagada com sucesso", category);
  } catch (error: any) {
    return ApiResponse.error(res, error.message);
  }
}
