export interface SearchParams {
  title: string;
  sortByPrice?: "ASC" | "DESC";
  page?: number;
  perPage?: number;
  categoryId?: number;
}
