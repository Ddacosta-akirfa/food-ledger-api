import { CategoryDto } from "../dto/category.dto.js";
import { CreateCategoryDto } from "../dto/create.category.dto.js";
import { UpdateCategoryDto } from "../dto/update.category.dto.js";

export interface ICategoryRepository {
  create(data: CreateCategoryDto): Promise<CategoryDto>;
  findById(id: string): Promise<CategoryDto | null>;
  findAll(): Promise<CategoryDto[]>;
  update(id: string, data: UpdateCategoryDto): Promise<CategoryDto>;
  delete(id: string): Promise<CategoryDto>;
}
