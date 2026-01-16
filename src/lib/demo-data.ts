import { Merchant, MetricSnapshot, Action, Reward } from '@/types';

export const demoMerchants: Merchant[] = [
  {
    id: '1',
    name: 'Burger House',
    vertical: 'restaurants',
    tier: 'bronze',
    score: 58,
    avatar: '🍔'
  },
  {
    id: '2',
    name: 'Pizza Palace',
    vertical: 'restaurants',
    tier: 'silver',
    score: 72,
    avatar: '🍕'
  },
  {
    id: '3',
    name: 'Fresh Mart',
    vertical: 'market',
    tier: 'gold',
    score: 85,
    avatar: '🛒'
  }
];

export const demoMetrics: Record<string, MetricSnapshot> = {
  '1': {
    merchantId: '1',
    date: '2024-01-16',
    availabilityRate: 0.75,
    avgPrepDelay: 15,
    responseTime: 8,
    rating: 3.8,
    menuCompleteness: 0.5,
    outOfStockCancelRate: 0.25,
    lateOrderRate: 0.35,
    priceMismatchFlags: 2
  },
  '2': {
    merchantId: '2',
    date: '2024-01-16',
    availabilityRate: 0.85,
    avgPrepDelay: 8,
    responseTime: 4,
    rating: 4.2,
    menuCompleteness: 0.7,
    outOfStockCancelRate: 0.12,
    lateOrderRate: 0.18,
    priceMismatchFlags: 1
  },
  '3': {
    merchantId: '3',
    date: '2024-01-16',
    availabilityRate: 0.95,
    avgPrepDelay: 5,
    responseTime: 3,
    rating: 4.6,
    menuCompleteness: 0.9,
    outOfStockCancelRate: 0.05,
    lateOrderRate: 0.08,
    priceMismatchFlags: 0
  }
};

export const demoActions: Record<string, Action[]> = {
  '1': [
    {
      id: '1-1',
      merchantId: '1',
      type: 'update_prep_time',
      title: '🚀 Update burger prep time to 25 min during lunch rush',
      description: 'Our signature burgers need more prep time during peak lunch hours (12-2 PM) to ensure quality',
      effortMinutes: 3,
      points: 8,
      status: 'pending',
      impact: 'Reduce late deliveries by 25% during lunch hours',
      deepLink: '/settings/operations'
    },
    {
      id: '1-2',
      merchantId: '1',
      type: 'mark_out_of_stock',
      title: '🍔 Mark special sauce & fresh buns out-of-stock',
      description: 'Your popular bacon cheeseburger is missing key ingredients - update inventory now',
      effortMinutes: 2,
      points: 6,
      status: 'pending',
      impact: 'Prevent 15+ cancellation calls this weekend',
      deepLink: '/settings/inventory'
    },
    {
      id: '1-3',
      merchantId: '1',
      type: 'add_photos',
      title: '📸 Add mouthwatering burger photos',
      description: 'Customers love seeing juicy burgers - add professional photos to increase orders',
      effortMinutes: 5,
      points: 7,
      status: 'pending',
      impact: 'Boost order volume by 18% with better presentation',
      deepLink: '/catalog/photos'
    },
    {
      id: '1-4',
      merchantId: '1',
      type: 'menu_modifiers',
      title: '🍟 Complete burger customization options',
      description: 'Add cheese choices, sauce preferences, and side dish options to your menu',
      effortMinutes: 4,
      points: 5,
      status: 'pending',
      impact: 'Reduce customer service calls about customizations',
      deepLink: '/menu/modifiers'
    }
  ],
  '2': [
    {
      id: '2-1',
      merchantId: '2',
      type: 'update_prep_time',
      title: '🍕 Set pizza prep time to 20 min for large orders',
      description: 'Large family pizzas take longer to bake perfectly - update your timing',
      effortMinutes: 2,
      points: 7,
      status: 'pending',
      impact: 'Improve customer satisfaction with hot, fresh pizzas',
      deepLink: '/settings/operations'
    },
    {
      id: '2-2',
      merchantId: '2',
      type: 'add_photos',
      title: '📸 Showcase your signature deep-dish pizzas',
      description: 'Customers want to see that famous Chicago-style crust - add high-quality photos',
      effortMinutes: 6,
      points: 8,
      status: 'pending',
      impact: 'Increase specialty pizza orders by 22%',
      deepLink: '/catalog/photos'
    },
    {
      id: '2-3',
      merchantId: '2',
      type: 'menu_modifiers',
      title: '🧀 Complete topping customization',
      description: 'Add extra cheese, specialty crusts, and dietary options to your pizza menu',
      effortMinutes: 4,
      points: 6,
      status: 'pending',
      impact: 'Reduce modification requests and increase order value',
      deepLink: '/menu/modifiers'
    }
  ],
  '3': [
    {
      id: '3-1',
      merchantId: '3',
      type: 'enable_substitutions',
      title: '🛒 Smart substitution for fresh produce',
      description: 'When seasonal items are unavailable, suggest perfect alternatives automatically',
      effortMinutes: 3,
      points: 5,
      status: 'pending',
      impact: 'Convert more orders and reduce customer frustration',
      deepLink: '/settings/substitutions'
    }
  ]
};

export const rewardsData: Record<string, Reward> = {
  bronze: {
    tier: 'bronze',
    benefits: [
      'Standard commission rates',
      'Basic support',
      'Standard visibility'
    ]
  },
  silver: {
    tier: 'silver',
    benefits: [
      'Small ranking boost',
      'Reliable Merchant badge',
      'Ad credit: $50/month',
      'Priority email support'
    ]
  },
  gold: {
    tier: 'gold',
    benefits: [
      'Higher ranking boost / featured placement chances',
      'Ad credit: $150/month',
      'Priority phone support',
      'Exclusive partner benefits',
      'Lower commission (2% discount)'
    ]
  }
};

// Simulate action completion effects
export function simulateActionCompletion(merchantId: string, actionId: string) {
  const metrics = demoMetrics[merchantId];
  if (!metrics) return metrics;

  const action = demoActions[merchantId]?.find(a => a.id === actionId);
  if (!action) return metrics;

  // Simulate metric improvements based on action type
  const improvedMetrics = { ...metrics };

  switch (action.type) {
    case 'update_prep_time':
      improvedMetrics.lateOrderRate = Math.max(0, metrics.lateOrderRate - 0.15);
      improvedMetrics.avgPrepDelay = Math.max(0, metrics.avgPrepDelay - 5);
      break;
    case 'mark_out_of_stock':
      improvedMetrics.outOfStockCancelRate = Math.max(0, metrics.outOfStockCancelRate - 0.1);
      break;
    case 'add_photos':
      improvedMetrics.menuCompleteness = Math.min(1, metrics.menuCompleteness + 0.3);
      break;
    case 'enable_substitutions':
      improvedMetrics.outOfStockCancelRate = Math.max(0, metrics.outOfStockCancelRate - 0.08);
      break;
    case 'update_fulfillment':
      improvedMetrics.lateOrderRate = Math.max(0, metrics.lateOrderRate - 0.1);
      break;
  }

  return improvedMetrics;
}