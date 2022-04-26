export interface ApiResponse<T = undefined> {
  data: T;
  success: boolean;
}
