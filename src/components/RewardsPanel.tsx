import React from 'react';
import { Merchant } from '@/types';
import { rewardsData } from '@/lib/demo-data';

interface RewardsPanelProps {
  merchant: Merchant;
}

export function RewardsPanel({ merchant }: RewardsPanelProps) {
  const rewards = rewardsData[merchant.tier];

  const tierColors = {
    bronze: 'border-snoonu-lightRed bg-snoonu-lightRed',
    silver: 'border-snoonu-lightGray bg-snoonu-lightGray',
    gold: 'border-snoonu-lightGray bg-snoonu-lightGray'
  };

  const nextTier = merchant.tier === 'bronze' ? 'silver' : merchant.tier === 'silver' ? 'gold' : null;

  return (
    <div className="bg-white dark:bg-snoonu-dark-darkGray rounded-xl shadow-restaurant dark:shadow-restaurant-dark border border-snoonu-lightGray dark:border-snoonu-dark-lightGray p-6 transition-colors duration-300">
      <div className="flex items-center mb-6">
        <div className="text-2xl mr-3">🎁</div>
        <div>
          <h3 className="text-xl font-bold text-snoonu-black dark:text-snoonu-dark-white">Your Rewards</h3>
          <p className="text-snoonu-gray dark:text-snoonu-dark-gray text-sm">Earn more with better performance</p>
        </div>
      </div>

      <div className={`border-2 rounded-xl p-5 mb-6 ${tierColors[merchant.tier]} dark:bg-snoonu-dark-lightRed shadow-md`}>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-snoonu-black dark:text-snoonu-dark-white text-lg capitalize">
            {merchant.tier} Tier Benefits
          </h4>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-snoonu-red dark:bg-snoonu-dark-red text-white">
            Current Tier
          </span>
        </div>

        <ul className="space-y-2">
          {rewards.benefits.map((benefit, index) => (
            <li key={index} className="text-snoonu-gray dark:text-snoonu-dark-gray flex items-center">
              <span className="text-snoonu-red dark:text-snoonu-dark-red mr-3 text-lg">✓</span>
              <span className="font-medium">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {nextTier && (
        <div className="border-2 border-dashed border-snoonu-lightGray rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-snoonu-black dark:text-snoonu-dark-white text-lg capitalize">
            {nextTier} Tier (Next Level)
          </h4>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-snoonu-gray dark:bg-snoonu-dark-gray text-white">
            Unlock Soon
          </span>
        </div>

        <ul className="space-y-2 mb-4">
          {rewardsData[nextTier].benefits.map((benefit, index) => (
            <li key={index} className="text-snoonu-gray dark:text-snoonu-dark-gray flex items-center">
              <span className="text-snoonu-gray dark:text-snoonu-dark-gray mr-3 text-lg">○</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="pt-4 border-t border-snoonu-lightGray dark:border-snoonu-dark-lightGray">
          <h5 className="font-bold text-snoonu-black dark:text-snoonu-dark-white mb-2">🏆 Exclusive Track</h5>
          <p className="text-snoonu-gray dark:text-snoonu-dark-gray text-sm mb-3">
            Reach Gold tier and maintain it for 30 days to become an Exclusive Partner.
          </p>
          <button className="bg-snoonu-secondary dark:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 dark:hover:bg-blue-700">
            Learn More About Exclusivity
          </button>
          </div>
        </div>
      )}
    </div>
  );
}