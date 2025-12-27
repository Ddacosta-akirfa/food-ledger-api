import { PrismaClient } from "../../../generated/prisma/client.js";
import { CategoryDto } from "../dto/category.dto.js";
import { CreateCategoryDto } from "../dto/create.category.dto.js";
import { UpdateCategoryDto } from "../dto/update.category.dto.js";
import { ICategoryRepository } from "./ICategoryRepository.js";

export class CategoryRepository implements ICategoryRepository {
  constructor(private db: PrismaClient) {}

  async create(data: CreateCategoryDto): Promise<CategoryDto> {
    const category = await this.db.category.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return category;
  }

  async findById(id: string): Promise<CategoryDto | null> {
    const category = await this.db.category.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    return category;
  }

  async findAll(): Promise<CategoryDto[]> {
    const categories = await this.db.category.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" },
    });

    return categories;
  }

  async update(id: string, data: UpdateCategoryDto): Promise<CategoryDto> {
    const updatedCategory = await this.db.category.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
      },
    });

    return updatedCategory;
  }

  async delete(id: string): Promise<CategoryDto> {
    const deletedCategory = await this.db.category.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return deletedCategory;
  }
}
