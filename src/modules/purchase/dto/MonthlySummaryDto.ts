export interface CategorySummaryDto {
  categoryId: string;
  total: number;
}

export interface MonthlySummaryDto {
  total: number;
  byCategory: CategorySummaryDto[];
}
