export interface PaginatedResult<T> {
  data: T[],
  totalRows: number,
  totalPages: number,
  page: number,
  perPage: number,
}