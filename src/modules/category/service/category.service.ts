import { error } from "node:console";
import { CategoryDto } from "../dto/category.dto.js";
import { CreateCategoryDto } from "../dto/create.category.dto.js";
import { ICategoryRepository } from "../repository/ICategoryRepository.js";
import { UpdateCategoryDto } from "../dto/update.category.dto.js";

export class CategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async create(data: CreateCategoryDto): Promise<CategoryDto> {
    if (!data.name || data.name.trim().length === 0)
      throw new Error("Nome da categoria é um campo requerido");

    const category = await this.categoryRepository.create({
      name: data.name.trim(),
      description: data.description ?? null,
    });

    return category;
  }

  async findById(id: string): Promise<CategoryDto | null> {
    if (!id) throw new Error("Id Categoria é requerido");

    const category = this.categoryRepository.findById(id);

    if (!category) throw new Error("Categoria não encontrada");

    return category;
  }

  async findAll(): Promise<CategoryDto[]> {
    return this.categoryRepository.findAll();
  }

  async update(id: string, data: UpdateCategoryDto): Promise<CategoryDto> {
    if (!id) throw new Error("Id Categoria é requerido");

    if (!data.name && data.description === undefined) {
      throw new Error("Pelo menos um campo deve ser preenchido");
    }

    const existing = await this.categoryRepository.findById(id);

    if (!existing) {
      throw new Error("Categoria não encontrada ou apagada");
    }

    const updateData: UpdateCategoryDto = {};

    if (data.name !== undefined) {
      updateData.name = data.name.trim();
    }

    if (data.description !== undefined) {
      updateData.description = data.description;
    }

    const updatedCategory = await this.categoryRepository.update(
      id,
      updateData
    );

    return updatedCategory;
  }

  async delete(id: string): Promise<CategoryDto> {
    if (!id) throw new Error("Id Categoria é requerido");

    const existing = await this.categoryRepository.findById(id);

    if (!existing) {
      throw new Error("Categoria não encontrada ou já está apagada");
    }

    return this.categoryRepository.delete(id);
  }
}
