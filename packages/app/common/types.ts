export interface ApiResponse<T = undefined> {
  data: T;
  success: boolean;
}

export interface PaginatedApiResponse<T = undefined> {
  data: {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
  };
  success: boolean;
}

export interface SearchParams {
  query: string;
  page: number;
}
