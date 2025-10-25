// TypeScript declarations for live-italy

export type Lang = "it" | "en";
export type SortField = "category" | "metric" | "value" | "updated_at" | "last_updated";
export type SortOrder = "asc" | "desc";
export type Format = "full" | "compact";

export interface StatisticsParams {
  category?: string;  // IT or EN
  metric?: string;    // IT or EN
  lang?: Lang;        // default 'it'
  limit?: number;     // default 100, max 1000
  offset?: number;    // default 0
  sort?: SortField;   // default 'updated_at'
  order?: SortOrder;  // default 'desc'
  format?: Format;    // default 'full'
}

export interface CategoriesParams {
  lang?: Lang; // default 'it'
}

export interface MetricsParams {
  category?: string;  // IT or EN
  lang?: Lang;        // default 'it'
}

// ---- Minimal response types (loose to match API evolution) ----
export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
}

export interface StatisticsRecord {
  id: number;
  category: string;    // translated according to ?lang
  metric: string;      // translated according to ?lang
  value: number;
  source?: string | null;
  rate_per_second?: number | null;
  base_value?: number | null;
  last_updated?: string | null; // ISO
  updated_at?: string | null;   // ISO
  [k: string]: any;
}

export interface StatisticsFullResponse {
  success: boolean;
  data: StatisticsRecord[];
  pagination: Pagination;
  filters_applied: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface StatisticsCompactResponse {
  success: boolean;
  data: Record<string, Record<string, number>>;
  pagination: Pagination;
  filters_applied: Record<string, any>;
}

export type StatisticsResponse = StatisticsFullResponse | StatisticsCompactResponse;

export interface CategoriesResponse {
  success: boolean;
  data: string[]; // translated category names
  total_categories: number;
  filters_applied: { language: Lang };
}

export interface MetricsCategoryBlock {
  category: string;   // translated category name
  metrics: string[];  // translated metric names
}
export interface MetricsResponse {
  success: boolean;
  data: MetricsCategoryBlock[];
  total_categories: number;
  filters_applied: { category: string | null; language: Lang };
}

export interface HealthResponse {
  status: string;
  api_version?: string;
  timestamp: string;
  database?: Record<string, any>;
  endpoints?: string[];
  [k: string]: any;
}

// ---- Function declarations ----
export function getStatistics(params?: StatisticsParams): Promise<StatisticsResponse>;
export function getCategories(params?: CategoriesParams): Promise<CategoriesResponse>;
export function getMetrics(params?: MetricsParams): Promise<MetricsResponse>;
export function getHealth(): Promise<HealthResponse>;

// ---- Default export (for convenience) ----
declare const liveItaly: {
  getStatistics: typeof getStatistics;
  getCategories: typeof getCategories;
  getMetrics: typeof getMetrics;
  getHealth: typeof getHealth;
};

export default liveItaly;