import { NextRequest, NextResponse } from 'next/server';
import { calculateScore, getTier } from '@/lib/scoring';
import { simulateActionCompletion, demoActions, demoMerchants } from '@/lib/demo-data';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; actionId: string } }
) {
  try {
    const merchantId = params.id;
    const actionId = params.actionId;

    const merchant = demoMerchants.find(m => m.id === merchantId);
    if (!merchant) {
      return NextResponse.json({ error: 'Merchant not found' }, { status: 404 });
    }

    const actions = demoActions[merchantId] || [];
    const actionIndex = actions.findIndex(a => a.id === actionId);

    if (actionIndex === -1) {
      return NextResponse.json({ error: 'Action not found' }, { status: 404 });
    }

    // Mark action as completed
    actions[actionIndex].status = 'completed';

    // Simulate metric improvements
    const improvedMetrics = simulateActionCompletion(merchantId, actionId);
    const newScoreBreakdown = calculateScore(improvedMetrics);
    const newTier = getTier(newScoreBreakdown.overall);

    // Update merchant data
    merchant.score = newScoreBreakdown.overall;
    merchant.tier = newTier;

    return NextResponse.json({
      success: true,
      action: actions[actionIndex],
      newScore: newScoreBreakdown.overall,
      newTier,
      pointsGained: actions[actionIndex].points,
      scoreBreakdown: newScoreBreakdown
    });
  } catch (error) {
    console.error('Action completion API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}