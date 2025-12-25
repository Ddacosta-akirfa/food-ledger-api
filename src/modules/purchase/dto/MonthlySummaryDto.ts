export interface CategorySummaryDTO {
  categoryId: string;
  total: number;
}

export interface MonthlySummaryDTO {
  total: number;
  byCategory: CategorySummaryDTO[];
}
