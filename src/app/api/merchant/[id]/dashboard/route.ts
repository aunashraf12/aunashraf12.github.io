import { NextRequest, NextResponse } from 'next/server';
import { calculateScore } from '@/lib/scoring';
import { generateRecommendations } from '@/lib/recommendations';
import { demoMerchants, demoMetrics, demoActions } from '@/lib/demo-data';
import { DashboardData } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const merchantId = params.id;
    const merchant = demoMerchants.find(m => m.id === merchantId);

    if (!merchant) {
      return NextResponse.json({ error: 'Merchant not found' }, { status: 404 });
    }

    const metrics = demoMetrics[merchantId];
    if (!metrics) {
      return NextResponse.json({ error: 'Metrics not found' }, { status: 404 });
    }

    const scoreBreakdown = calculateScore(metrics);
    scoreBreakdown.improvementActions = generateRecommendations(metrics, merchant.vertical);

    const nextActions = demoActions[merchantId] || [];

    const dashboardData: DashboardData = {
      merchant: {
        ...merchant,
        score: scoreBreakdown.overall
      },
      scoreBreakdown,
      nextActions,
      recentActivity: nextActions.filter(a => a.status === 'completed').slice(0, 3)
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}