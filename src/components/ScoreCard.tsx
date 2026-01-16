import React from 'react';
import { Merchant, ScoreBreakdown } from '@/types';
import { getTier, getTierProgress } from '@/lib/scoring';

interface ScoreCardProps {
  merchant: Merchant;
  scoreBreakdown: ScoreBreakdown;
  onOpenSimulator?: () => void;
}

export function ScoreCard({ merchant, scoreBreakdown, onOpenSimulator }: ScoreCardProps) {
  const tier = getTier(scoreBreakdown.overall);
  const progress = getTierProgress(scoreBreakdown.overall);

  const tierColors = {
    bronze: 'bg-snoonu-red',
    silver: 'bg-snoonu-darkGray',
    gold: 'bg-snoonu-black'
  };

  const tierBgColors = {
    bronze: 'bg-snoonu-lightRed',
    silver: 'bg-snoonu-lightGray',
    gold: 'bg-snoonu-lightGray'
  };

  const getRestaurantIcon = (name: string) => {
    if (name.toLowerCase().includes('burger')) return '🍔';
    if (name.toLowerCase().includes('pizza')) return '🍕';
    if (name.toLowerCase().includes('sushi')) return '🍣';
    if (name.toLowerCase().includes('taco')) return '🌮';
    return '🍽️';
  };

  return (
    <div className="bg-white dark:bg-snoonu-dark-darkGray rounded-xl shadow-restaurant dark:shadow-restaurant-dark border border-snoonu-lightGray dark:border-snoonu-dark-lightGray p-6 relative overflow-hidden transition-colors duration-300">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-restaurant-pattern dark:bg-restaurant-pattern-dark opacity-50"></div>

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-4xl bg-snoonu-lightRed dark:bg-snoonu-dark-lightRed rounded-full p-3">
              {getRestaurantIcon(merchant.name)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-snoonu-black dark:text-snoonu-dark-white">{merchant.name}</h2>
              <p className="text-snoonu-gray dark:text-snoonu-dark-gray capitalize flex items-center">
                <span className="mr-2">🏪</span>
                {merchant.vertical.replace('_', ' ')}
              </p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg`}>
            {tier.charAt(0).toUpperCase() + tier.slice(1)} Tier
          </div>
        </div>

        {/* Score Display */}
        <div className="text-center mb-6">
          <div className="relative">
            <div className="text-6xl font-black text-snoonu-black dark:text-snoonu-dark-white mb-2">{scoreBreakdown.overall}</div>
            <div className="absolute -top-2 -right-8 text-2xl">⭐</div>
          </div>
          <div className="text-snoonu-gray dark:text-snoonu-dark-gray font-medium">Merchant Score</div>
          <div className="text-xs text-snoonu-gray dark:text-snoonu-dark-gray mt-1">Out of 100 points</div>
        </div>

        {/* What If Button */}
        {onOpenSimulator && (
          <div className="text-center mb-6">
            <button
              onClick={onOpenSimulator}
              className="bg-snoonu-red dark:bg-snoonu-dark-red hover:bg-snoonu-darkRed dark:hover:bg-snoonu-dark-darkRed text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              🎯 What If I Improve?
            </button>
            <p className="text-snoonu-gray dark:text-snoonu-dark-gray text-xs mt-2">Simulate score & revenue changes</p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-snoonu-gray dark:text-snoonu-dark-gray mb-2">
            <span className="font-medium">Progress to Next Tier</span>
            <span className="font-semibold">{progress.pointsNeeded} points needed</span>
          </div>
          <div className="w-full bg-snoonu-lightGray dark:bg-snoonu-dark-lightGray rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out`}
              style={{
                width: `${((scoreBreakdown.overall - progress.current) / (progress.next - progress.current)) * 100}%`
              }}
            ></div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${tierBgColors[tier]} dark:bg-snoonu-dark-lightRed`}>
            <div className="flex items-center justify-between">
              <span className="text-snoonu-gray dark:text-snoonu-dark-gray text-sm">Availability</span>
              <span className="text-snoonu-black dark:text-snoonu-dark-white font-bold">{scoreBreakdown.availability}%</span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${tierBgColors[tier]} dark:bg-snoonu-dark-lightRed`}>
            <div className="flex items-center justify-between">
              <span className="text-snoonu-gray dark:text-snoonu-dark-gray text-sm">Reliability</span>
              <span className="text-snoonu-black dark:text-snoonu-dark-white font-bold">{scoreBreakdown.reliability}%</span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${tierBgColors[tier]} dark:bg-snoonu-dark-lightRed`}>
            <div className="flex items-center justify-between">
              <span className="text-snoonu-gray dark:text-snoonu-dark-gray text-sm">Menu Quality</span>
              <span className="text-snoonu-black dark:text-snoonu-dark-white font-bold">{scoreBreakdown.catalogQuality}%</span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${tierBgColors[tier]} dark:bg-snoonu-dark-lightRed`}>
            <div className="flex items-center justify-between">
              <span className="text-snoonu-gray dark:text-snoonu-dark-gray text-sm">Response</span>
              <span className="text-snoonu-black dark:text-snoonu-dark-white font-bold">{scoreBreakdown.response}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}