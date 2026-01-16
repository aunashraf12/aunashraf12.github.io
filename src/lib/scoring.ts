import { MetricSnapshot, ScoreBreakdown, Tier } from '@/types';

export function calculateScore(metrics: MetricSnapshot): ScoreBreakdown {
  // Calculate subscores (0-1 scale)
  const availabilityScore = Math.max(0, 1 - metrics.outOfStockCancelRate);
  const reliabilityScore = Math.max(0, 1 - metrics.lateOrderRate);
  const catalogQualityScore = metrics.menuCompleteness;
  const responseScore = Math.max(0, Math.min(1, 1 - (metrics.responseTime / 10)));
  const sentimentScore = Math.max(0, Math.min(1, (metrics.rating - 3) / 2));

  // Weighted overall score
  const overall = Math.round(
    25 * availabilityScore +
    25 * reliabilityScore +
    20 * catalogQualityScore +
    15 * responseScore +
    15 * sentimentScore
  );

  // Generate top issues based on low scores
  const topIssues = [];
  if (availabilityScore < 0.7) {
    topIssues.push("High cancellation rate due to out-of-stock items");
  }
  if (reliabilityScore < 0.7) {
    topIssues.push("Orders frequently delayed beyond promised time");
  }
  if (catalogQualityScore < 0.6) {
    topIssues.push("Incomplete product listings (missing photos/descriptions)");
  }
  if (responseScore < 0.7) {
    topIssues.push("Slow response to customer inquiries");
  }
  if (sentimentScore < 0.7) {
    topIssues.push("Low customer satisfaction ratings");
  }

  return {
    overall,
    availability: Math.round(availabilityScore * 100),
    reliability: Math.round(reliabilityScore * 100),
    catalogQuality: Math.round(catalogQualityScore * 100),
    response: Math.round(responseScore * 100),
    sentiment: Math.round(sentimentScore * 100),
    topIssues: topIssues.length > 0 ? topIssues : ["Performance is excellent!"],
    improvementActions: [], // Will be populated by recommendation engine
  };
}

export function getTier(score: number): Tier {
  if (score >= 80) return 'gold';
  if (score >= 65) return 'silver';
  return 'bronze';
}

export function getTierProgress(score: number): { current: number; next: number; pointsNeeded: number } {
  const tier = getTier(score);

  if (tier === 'gold') {
    return { current: 80, next: 100, pointsNeeded: 0 };
  }

  if (tier === 'silver') {
    return { current: 65, next: 80, pointsNeeded: 80 - score };
  }

  return { current: 0, next: 65, pointsNeeded: 65 - score };
}