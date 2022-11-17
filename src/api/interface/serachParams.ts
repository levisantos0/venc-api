export interface SearchParams {
  title: string;
  orderBy: { sortByPrice?: "ASC" | "DESC" };
  page?: number;
  perPage?: number;
  categoryId?: number;
}
