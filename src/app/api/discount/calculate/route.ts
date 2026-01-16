import { NextRequest, NextResponse } from 'next/server';
import { DiscountScenario } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      itemPrice,
      costOrMargin,
      discountType,
      discountValue,
      expectedUplift,
      snoonuCommission
    } = body;

    // Calculate profit before discount
    const commissionAmount = itemPrice * (snoonuCommission / 100);
    const costAmount = costOrMargin > 1 ? costOrMargin : itemPrice * (costOrMargin / 100);
    const profitBefore = itemPrice - costAmount - commissionAmount;

    // Calculate discount impact
    let discountAmount = 0;
    switch (discountType) {
      case 'percentage':
        discountAmount = itemPrice * (discountValue / 100);
        break;
      case 'bundle':
        discountAmount = discountValue; // Fixed discount amount
        break;
      case 'bogo':
        discountAmount = itemPrice * 0.5; // Buy one get one half off
        break;
    }

    const discountedPrice = Math.max(0, itemPrice - discountAmount);
    const commissionAfter = discountedPrice * (snoonuCommission / 100);
    const profitAfter = discountedPrice - costAmount - commissionAfter;

    // Calculate break-even uplift needed
    const additionalOrdersNeeded = profitBefore > 0 ?
      Math.ceil((profitBefore * 100) / profitAfter) : 0;

    const breakEvenUplift = additionalOrdersNeeded;

    const scenario: DiscountScenario = {
      itemPrice,
      costOrMargin,
      discountType,
      discountValue,
      expectedUplift,
      snoonuCommission,
      profitBefore: Math.round(profitBefore * 100) / 100,
      profitAfter: Math.round(profitAfter * 100) / 100,
      breakEvenUplift
    };

    return NextResponse.json({
      scenario,
      recommendation: profitAfter > profitBefore ? 'profit-maximizing' : 'volume-maximizing',
      analysis: {
        commissionBefore: Math.round(commissionAmount * 100) / 100,
        commissionAfter: Math.round(commissionAfter * 100) / 100,
        profitIncrease: Math.round((profitAfter - profitBefore) * 100) / 100,
        upliftNeeded: breakEvenUplift
      }
    });
  } catch (error) {
    console.error('Discount calculator API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}