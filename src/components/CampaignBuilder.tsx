import React, { useState } from 'react';

interface CampaignDraft {
  title: string;
  description: string;
  items: CampaignItem[];
  discount: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  schedule: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  };
  target: {
    minOrder: number;
    maxOrders: number;
  };
}

interface CampaignItem {
  id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  reason: string;
}

interface CampaignBuilderProps {
  onCreateCampaign: (campaign: CampaignDraft) => void;
}

const mockTopItems: CampaignItem[] = [
  {
    id: '1',
    name: 'Signature Cheeseburger',
    originalPrice: 25,
    discountedPrice: 20,
    image: '🍔',
    reason: 'Your #1 seller - 45% of orders'
  },
  {
    id: '2',
    name: 'Loaded Fries',
    originalPrice: 8,
    discountedPrice: 6,
    image: '🍟',
    reason: 'Popular side - 30% of orders'
  },
  {
    id: '3',
    name: 'Chocolate Milkshake',
    originalPrice: 12,
    discountedPrice: 9,
    image: '🥤',
    reason: 'Trending dessert - 25% of orders'
  }
];

export function CampaignBuilder({ onCreateCampaign }: CampaignBuilderProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaignDraft, setCampaignDraft] = useState<CampaignDraft | null>(null);
  const [isApproved, setIsApproved] = useState(false);

  const generateCampaign = () => {
    setIsGenerating(true);

    // Simulate AI-powered campaign generation
    setTimeout(() => {
      const draft: CampaignDraft = {
        title: '🚀 Lunch Rush Special: 20% Off Your Favorites!',
        description: 'Beat the lunch crowd with irresistible deals on your most popular items. Perfect for driving traffic during peak hours!',
        items: mockTopItems.map(item => ({
          ...item,
          discountedPrice: Math.round(item.originalPrice * 0.8) // 20% off
        })),
        discount: {
          type: 'percentage',
          value: 20
        },
        schedule: {
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          startTime: '11:00',
          endTime: '15:00'
        },
        target: {
          minOrder: 15,
          maxOrders: 50
        }
      };

      setCampaignDraft(draft);
      setIsGenerating(false);
    }, 2000);
  };

  const handleApprove = () => {
    if (campaignDraft) {
      onCreateCampaign(campaignDraft);
      setIsApproved(true);
    }
  };

  if (isApproved && campaignDraft) {
    return (
      <div className="bg-white dark:bg-snoonu-dark-darkGray rounded-xl shadow-restaurant dark:shadow-restaurant-dark border border-snoonu-lightGray dark:border-snoonu-dark-lightGray p-6 transition-colors duration-300">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-snoonu-black dark:text-snoonu-dark-white mb-2">Campaign Launched!</h3>
          <p className="text-snoonu-gray dark:text-snoonu-dark-gray mb-4">
            "{campaignDraft.title}" is now live and ready to drive sales.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 inline-block">
            <p className="text-green-800 dark:text-green-300 font-semibold">Expected Results:</p>
            <p className="text-green-700 dark:text-green-400 text-sm">+25% orders during lunch hours</p>
            <p className="text-green-700 dark:text-green-400 text-sm">+15% revenue increase</p>
          </div>
        </div>
      </div>
    );
  }

  if (campaignDraft) {
    return (
      <div className="bg-white dark:bg-snoonu-dark-darkGray rounded-xl shadow-restaurant dark:shadow-restaurant-dark border border-snoonu-lightGray dark:border-snoonu-dark-lightGray p-6 transition-colors duration-300">
        <div className="flex items-center mb-6">
          <div className="text-2xl mr-3">📋</div>
          <div>
            <h3 className="text-xl font-bold text-snoonu-black">Campaign Draft Ready</h3>
            <p className="text-snoonu-gray text-sm">Review and launch your AI-generated campaign</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Campaign Overview */}
          <div className="bg-gradient-to-r from-snoonu-red to-red-600 text-white rounded-xl p-6">
            <h4 className="text-xl font-bold mb-2">{campaignDraft.title}</h4>
            <p className="text-red-100">{campaignDraft.description}</p>
          </div>

          {/* Campaign Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Items */}
            <div>
              <h5 className="font-bold text-snoonu-black mb-3">📦 Featured Items</h5>
              <div className="space-y-3">
                {campaignDraft.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-snoonu-lightRed rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{item.image}</span>
                      <div>
                        <p className="font-medium text-snoonu-black">{item.name}</p>
                        <p className="text-snoonu-gray text-xs">{item.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-snoonu-red">${item.discountedPrice}</p>
                      <p className="text-snoonu-gray text-xs line-through">${item.originalPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule & Targeting */}
            <div>
              <h5 className="font-bold text-snoonu-black mb-3">⏰ Campaign Details</h5>
              <div className="space-y-3">
                <div className="bg-snoonu-lightRed rounded-lg p-3">
                  <p className="text-snoonu-gray text-xs">Duration</p>
                  <p className="font-medium text-snoonu-black">
                    {campaignDraft.schedule.startDate} to {campaignDraft.schedule.endDate}
                  </p>
                  <p className="text-snoonu-gray text-xs">
                    {campaignDraft.schedule.startTime} - {campaignDraft.schedule.endTime} daily
                  </p>
                </div>
                <div className="bg-snoonu-lightRed rounded-lg p-3">
                  <p className="text-snoonu-gray text-xs">Discount</p>
                  <p className="font-medium text-snoonu-black">
                    {campaignDraft.discount.value}% off
                  </p>
                </div>
                <div className="bg-snoonu-lightRed rounded-lg p-3">
                  <p className="text-snoonu-gray text-xs">Targeting</p>
                  <p className="font-medium text-snoonu-black">
                    Orders ${campaignDraft.target.minOrder}+
                  </p>
                  <p className="text-snoonu-gray text-xs">
                    Limited to {campaignDraft.target.maxOrders} redemptions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4 border-t border-snoonu-lightGray">
            <button
              onClick={() => setCampaignDraft(null)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Edit Draft
            </button>
            <button
              onClick={handleApprove}
              className="flex-1 bg-snoonu-red hover:bg-snoonu-darkRed text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              🚀 Launch Campaign
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-restaurant border border-snoonu-lightGray p-6">
      <div className="flex items-center mb-6">
        <div className="text-2xl mr-3">🎯</div>
        <div>
          <h3 className="text-xl font-bold text-snoonu-black">Campaign Builder</h3>
          <p className="text-snoonu-gray text-sm">AI-powered campaign creation in one click</p>
        </div>
      </div>

      <div className="text-center py-8">
        <div className="bg-gradient-to-r from-snoonu-red to-red-600 text-white rounded-xl p-8 mb-6">
          <div className="text-4xl mb-4">🤖</div>
          <h4 className="text-xl font-bold mb-2">Smart Campaign Generation</h4>
          <p className="text-red-100">
            Our AI analyzes your sales data, customer preferences, and peak hours to create
            the perfect promotional campaign automatically.
          </p>
        </div>

        <button
          onClick={generateCampaign}
          disabled={isGenerating}
          className="bg-snoonu-red hover:bg-snoonu-darkRed disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
        >
          {isGenerating ? (
            <span className="flex items-center">
              <span className="animate-spin mr-3">⏳</span>
              Generating Campaign...
            </span>
          ) : (
            <span className="flex items-center">
              <span className="mr-2">✨</span>
              Create Smart Campaign
            </span>
          )}
        </button>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-blue-600 font-semibold">📊 Data-Driven</div>
            <div className="text-blue-700 text-xs">Based on your top sellers</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-green-600 font-semibold">⏰ Peak Hours</div>
            <div className="text-green-700 text-xs">Optimized for busy times</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="text-purple-600 font-semibold">🎯 Smart Targeting</div>
            <div className="text-purple-700 text-xs">Maximum impact, minimum waste</div>
          </div>
        </div>
      </div>
    </div>
  );
}