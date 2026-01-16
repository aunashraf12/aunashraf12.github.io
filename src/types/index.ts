export type Vertical = 'restaurants' | 'market' | 'grocery' | 'snoonu_city' | 'laundry';

export type Tier = 'bronze' | 'silver' | 'gold';

export interface Merchant {
  id: string;
  name: string;
  vertical: Vertical;
  tier: Tier;
  score: number;
  avatar?: string;
}

export interface MetricSnapshot {
  merchantId: string;
  date: string;
  availabilityRate: number; // 0-1
  avgPrepDelay: number; // minutes
  responseTime: number; // minutes
  rating: number; // 1-5
  menuCompleteness: number; // 0-1 (photos, descriptions, etc.)
  outOfStockCancelRate: number;
  lateOrderRate: number;
  priceMismatchFlags: number;
}

export interface Action {
  id: string;
  merchantId: string;
  type: string;
  title: string;
  description: string;
  effortMinutes: number;
  points: number;
  status: 'pending' | 'completed' | 'in_progress';
  impact: string;
  deepLink?: string;
}

export interface Reward {
  tier: Tier;
  benefits: string[];
  requirements?: string[];
}

export interface DiscountScenario {
  itemPrice: number;
  costOrMargin: number;
  discountType: 'percentage' | 'bundle' | 'bogo';
  discountValue: number;
  expectedUplift: number;
  snoonuCommission: number;
  profitBefore: number;
  profitAfter: number;
  breakEvenUplift: number;
}

export interface ScoreBreakdown {
  overall: number;
  availability: number;
  reliability: number;
  catalogQuality: number;
  response: number;
  sentiment: number;
  topIssues: string[];
  improvementActions: Action[];
}

export interface DashboardData {
  merchant: Merchant;
  scoreBreakdown: ScoreBreakdown;
  nextActions: Action[];
  recentActivity: Action[];
}