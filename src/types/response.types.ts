export interface Metadata {
  totalPages: number
  totalItems: number
  itemsPerPage: number
  currentPage: number
  searchTerm?: string
  nextPage: number | null
}

export interface Paginated<T> {
  rows: T[];
  metadata: Metadata;
}

export interface Res<T> {
  status: boolean
  message: string
  data: T
}

export interface ErrorData {
  message: string,
  code: string,
  httpStatus: number
}
