import { MetricSnapshot, Action, Vertical } from '@/types';

export function generateRecommendations(metrics: MetricSnapshot, vertical: Vertical): Action[] {
  const actions: Action[] = [];

  // Universal recommendations
  if (metrics.outOfStockCancelRate > 0.1) {
    actions.push({
      id: `oos-${Date.now()}`,
      merchantId: metrics.merchantId,
      type: 'mark_out_of_stock',
      title: 'Mark 8 items out-of-stock',
      description: 'Identify and mark frequently out-of-stock items to reduce cancellations',
      effortMinutes: 3,
      points: 4,
      status: 'pending',
      impact: 'Reduce cancellation rate by up to 15%',
      deepLink: '/settings/inventory'
    });
  }

  if (metrics.lateOrderRate > 0.2) {
    if (vertical === 'restaurants') {
      actions.push({
        id: `prep-${Date.now()}`,
        merchantId: metrics.merchantId,
        type: 'update_prep_time',
        title: 'Set prep time to 35 min during rush hours',
        description: 'Increase preparation time during peak hours (7-9 PM) to improve reliability',
        effortMinutes: 2,
        points: 6,
        status: 'pending',
        impact: 'Reduce late orders by 20%',
        deepLink: '/settings/operations'
      });
    } else {
      actions.push({
        id: `fulfill-${Date.now()}`,
        merchantId: metrics.merchantId,
        type: 'update_fulfillment',
        title: 'Update fulfillment times',
        description: 'Adjust processing times to match actual capabilities',
        effortMinutes: 5,
        points: 5,
        status: 'pending',
        impact: 'Improve on-time delivery rate',
        deepLink: '/settings/operations'
      });
    }
  }

  if (metrics.menuCompleteness < 0.6) {
    actions.push({
      id: `photos-${Date.now()}`,
      merchantId: metrics.merchantId,
      type: 'add_photos',
      title: 'Add photos to top 10 products',
      description: 'Upload high-quality photos for your best-selling items',
      effortMinutes: 8,
      points: 5,
      status: 'pending',
      impact: 'Increase order conversion by 12%',
      deepLink: '/catalog/photos'
    });
  }

  if (metrics.responseTime > 5) {
    actions.push({
      id: `response-${Date.now()}`,
      merchantId: metrics.merchantId,
      type: 'auto_accept',
      title: 'Enable auto-accept for standard orders',
      description: 'Automatically accept orders under $50 during operational hours',
      effortMinutes: 1,
      points: 3,
      status: 'pending',
      impact: 'Respond to orders in under 2 minutes',
      deepLink: '/settings/orders'
    });
  }

  if (metrics.rating < 4.2) {
    actions.push({
      id: `quality-${Date.now()}`,
      merchantId: metrics.merchantId,
      type: 'quality_check',
      title: 'Run quality assurance checklist',
      description: 'Review order preparation and packaging standards',
      effortMinutes: 10,
      points: 7,
      status: 'pending',
      impact: 'Improve customer satisfaction scores',
      deepLink: '/settings/quality'
    });
  }

  // Vertical-specific recommendations
  if (vertical === 'restaurants') {
    if (metrics.avgPrepDelay > 10) {
      actions.push({
        id: `modifiers-${Date.now()}`,
        merchantId: metrics.merchantId,
        type: 'menu_modifiers',
        title: 'Review menu modifiers and add-ons',
        description: 'Ensure all menu items have complete modifier options',
        effortMinutes: 5,
        points: 4,
        status: 'pending',
        impact: 'Reduce order modification requests',
        deepLink: '/menu/modifiers'
      });
    }
  }

  if (vertical === 'market' || vertical === 'grocery') {
    actions.push({
      id: `substitutions-${Date.now()}`,
      merchantId: metrics.merchantId,
      type: 'enable_substitutions',
      title: 'Enable substitution rules for missing items',
      description: 'Set up automatic substitution suggestions for out-of-stock products',
      effortMinutes: 4,
      points: 7,
      status: 'pending',
      impact: 'Convert 25% more orders with missing items',
      deepLink: '/settings/substitutions'
    });
  }

  // Sort by impact (points) and limit to top 5
  return actions
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);
}