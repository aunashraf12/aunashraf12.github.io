import React, { useState } from 'react';
import { DiscountScenario } from '@/types';

interface DiscountCalculatorProps {
  onCalculate: (scenario: any) => void;
  isLoading?: boolean;
}

export function DiscountCalculator({ onCalculate, isLoading = false }: DiscountCalculatorProps) {
  const [formData, setFormData] = useState({
    itemPrice: 25,
    costOrMargin: 60, // 60% margin
    discountType: 'percentage' as const,
    discountValue: 15,
    expectedUplift: 30,
    snoonuCommission: 15
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const handleInputChange = (field: string, value: number | string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white dark:bg-snoonu-dark-darkGray rounded-xl shadow-restaurant dark:shadow-restaurant-dark border border-snoonu-lightGray dark:border-snoonu-dark-lightGray p-6 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-snoonu-black dark:text-snoonu-dark-white mb-4">💰 Profit Calculator</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-snoonu-black dark:text-snoonu-dark-white mb-1">
              Item Price ($)
            </label>
            <input
              type="number"
              value={formData.itemPrice}
              onChange={(e) => handleInputChange('itemPrice', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-snoonu-lightGray dark:border-snoonu-dark-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-snoonu-red dark:focus:ring-snoonu-dark-red bg-white dark:bg-snoonu-dark-darkGray text-snoonu-black dark:text-snoonu-dark-white"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-snoonu-black dark:text-snoonu-dark-white mb-1">
              Cost/Margin (%)
            </label>
            <input
              type="number"
              value={formData.costOrMargin}
              onChange={(e) => handleInputChange('costOrMargin', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-snoonu-lightGray dark:border-snoonu-dark-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-snoonu-red dark:focus:ring-snoonu-dark-red bg-white dark:bg-snoonu-dark-darkGray text-snoonu-black dark:text-snoonu-dark-white"
              min="0"
              max="100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-snoonu-black dark:text-snoonu-dark-white mb-1">
            Discount Type
          </label>
          <select
            value={formData.discountType}
            onChange={(e) => handleInputChange('discountType', e.target.value)}
            className="w-full px-3 py-2 border border-snoonu-lightGray dark:border-snoonu-dark-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-snoonu-red dark:focus:ring-snoonu-dark-red bg-white dark:bg-snoonu-dark-darkGray text-snoonu-black dark:text-snoonu-dark-white"
          >
            <option value="percentage">Percentage Off</option>
            <option value="bundle">Bundle Discount ($)</option>
            <option value="bogo">Buy One Get One</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-snoonu-black dark:text-snoonu-dark-white mb-1">
              {formData.discountType === 'percentage' ? 'Discount (%)' :
               formData.discountType === 'bundle' ? 'Discount ($)' : 'BOGO Value'}
            </label>
            <input
              type="number"
              value={formData.discountValue}
              onChange={(e) => handleInputChange('discountValue', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-snoonu-lightGray dark:border-snoonu-dark-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-snoonu-red dark:focus:ring-snoonu-dark-red bg-white dark:bg-snoonu-dark-darkGray text-snoonu-black dark:text-snoonu-dark-white"
              min="0"
              step={formData.discountType === 'percentage' ? '1' : '0.01'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-snoonu-black dark:text-snoonu-dark-white mb-1">
              Expected Uplift (%)
            </label>
            <input
              type="number"
              value={formData.expectedUplift}
              onChange={(e) => handleInputChange('expectedUplift', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-snoonu-lightGray dark:border-snoonu-dark-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-snoonu-red dark:focus:ring-snoonu-dark-red bg-white dark:bg-snoonu-dark-darkGray text-snoonu-black dark:text-snoonu-dark-white"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-snoonu-black dark:text-snoonu-dark-white mb-1">
            Snoonu Commission (%)
          </label>
          <input
            type="number"
            value={formData.snoonuCommission}
            onChange={(e) => handleInputChange('snoonuCommission', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-snoonu-lightGray dark:border-snoonu-dark-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-snoonu-red dark:focus:ring-snoonu-dark-red bg-white dark:bg-snoonu-dark-darkGray text-snoonu-black dark:text-snoonu-dark-white"
            min="0"
            max="100"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-snoonu-red dark:bg-snoonu-dark-red text-white py-2 px-4 rounded-md font-medium hover:bg-snoonu-darkRed dark:hover:bg-snoonu-dark-darkRed disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? 'Calculating...' : 'Calculate Profit Impact'}
        </button>
      </form>
    </div>
  );
}