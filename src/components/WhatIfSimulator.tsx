import React, { useState, useEffect } from 'react';
import { MetricSnapshot } from '@/types';
import { calculateScore } from '@/lib/scoring';

interface WhatIfSimulatorProps {
  currentMetrics: MetricSnapshot;
  onClose: () => void;
}

interface SimulationResult {
  score: number;
  salesUplift: number;
  profitIncrease: number;
}

export function WhatIfSimulator({ currentMetrics, onClose }: WhatIfSimulatorProps) {
  const [simulations, setSimulations] = useState({
    prepTime: currentMetrics.avgPrepDelay,
    stockoutRate: currentMetrics.outOfStockCancelRate,
    responseTime: currentMetrics.responseTime,
    rating: currentMetrics.rating
  });

  const [result, setResult] = useState<SimulationResult | null>(null);

  // Calculate baseline score
  const baselineScore = calculateScore(currentMetrics).overall;

  useEffect(() => {
    // Simulate metrics with new values
    const simulatedMetrics: MetricSnapshot = {
      ...currentMetrics,
      avgPrepDelay: simulations.prepTime,
      outOfStockCancelRate: simulations.stockoutRate,
      responseTime: simulations.responseTime,
      rating: simulations.rating
    };

    const newScore = calculateScore(simulatedMetrics).overall;
    const scoreChange = newScore - baselineScore;

    // Simple sales uplift calculation (can be made more sophisticated)
    const salesUplift = Math.max(-20, Math.min(30, scoreChange * 0.8 + (simulations.rating - currentMetrics.rating) * 5));
    const profitIncrease = salesUplift * 0.15; // Assume 15% profit margin

    setResult({
      score: newScore,
      salesUplift,
      profitIncrease
    });
  }, [simulations, baselineScore, currentMetrics]);

  const handleSliderChange = (field: string, value: number) => {
    setSimulations(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50 p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-snoonu-dark-darkGray rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transition-colors duration-300">
        {/* Header */}
        <div className="bg-snoonu-red dark:bg-snoonu-dark-red text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🎯</div>
              <div>
                <h2 className="text-xl font-bold">What-If Simulator</h2>
                <p className="text-red-100 text-sm">See how changes affect your score & revenue</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-red-700 dark:hover:bg-red-800 rounded-full p-2 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sliders Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-snoonu-black dark:text-snoonu-dark-white mb-4">Adjust Your Metrics</h3>

              {/* Prep Time Slider */}
              <div className="bg-snoonu-lightRed dark:bg-snoonu-dark-lightRed rounded-xl p-4 border border-snoonu-red/20 dark:border-snoonu-dark-red/20">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-medium text-snoonu-black dark:text-snoonu-dark-white">⏱️ Average Prep Time</label>
                  <span className="text-snoonu-red dark:text-snoonu-dark-red font-bold">{simulations.prepTime} min</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="45"
                  value={simulations.prepTime}
                  onChange={(e) => handleSliderChange('prepTime', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-snoonu-red"
                />
                <div className="flex justify-between text-xs text-snoonu-gray mt-1">
                  <span>Fast (5 min)</span>
                  <span>Slow (45 min)</span>
                </div>
              </div>

              {/* Stockout Rate Slider */}
              <div className="bg-snoonu-lightRed rounded-xl p-4 border border-snoonu-red/20">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-medium text-snoonu-black">📦 Stockout Cancellation Rate</label>
                  <span className="text-snoonu-red font-bold">{(simulations.stockoutRate * 100).toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.4"
                  step="0.01"
                  value={simulations.stockoutRate}
                  onChange={(e) => handleSliderChange('stockoutRate', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-snoonu-red"
                />
                <div className="flex justify-between text-xs text-snoonu-gray mt-1">
                  <span>Perfect (0%)</span>
                  <span>Problematic (40%)</span>
                </div>
              </div>

              {/* Response Time Slider */}
              <div className="bg-snoonu-lightRed rounded-xl p-4 border border-snoonu-red/20">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-medium text-snoonu-black">💬 Average Response Time</label>
                  <span className="text-snoonu-red font-bold">{simulations.responseTime} min</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={simulations.responseTime}
                  onChange={(e) => handleSliderChange('responseTime', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-snoonu-red"
                />
                <div className="flex justify-between text-xs text-snoonu-gray mt-1">
                  <span>Instant (1 min)</span>
                  <span>Slow (30 min)</span>
                </div>
              </div>

              {/* Rating Slider */}
              <div className="bg-snoonu-lightRed rounded-xl p-4 border border-snoonu-red/20">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-medium text-snoonu-black">⭐ Average Rating</label>
                  <span className="text-snoonu-red font-bold">{simulations.rating.toFixed(1)}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.1"
                  value={simulations.rating}
                  onChange={(e) => handleSliderChange('rating', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-snoonu-red"
                />
                <div className="flex justify-between text-xs text-snoonu-gray mt-1">
                  <span>Poor (1.0)</span>
                  <span>Excellent (5.0)</span>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-snoonu-black dark:text-snoonu-dark-white mb-4">Projected Impact</h3>

              {result && (
                <>
                  {/* Score Impact */}
                  <div className="bg-gradient-to-r from-snoonu-red to-red-600 dark:from-snoonu-dark-red dark:to-red-700 text-white rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-black">{result.score}</div>
                        <div className="text-red-100 dark:text-red-200">New Merchant Score</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${result.score > baselineScore ? 'text-green-300' : 'text-yellow-300'}`}>
                          {result.score > baselineScore ? '+' : ''}{(result.score - baselineScore).toFixed(1)}
                        </div>
                        <div className="text-red-200 dark:text-red-300 text-sm">vs current</div>
                      </div>
                    </div>
                  </div>

                  {/* Revenue Impact */}
                  <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-black">{result.salesUplift > 0 ? '+' : ''}{result.salesUplift.toFixed(1)}%</div>
                        <div className="text-green-100 dark:text-green-200">Sales Growth</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-200 dark:text-green-300">
                          ${result.profitIncrease > 0 ? '+' : ''}{result.profitIncrease.toFixed(0)}
                        </div>
                        <div className="text-green-200 dark:text-green-300 text-sm">extra profit/day</div>
                      </div>
                    </div>
                  </div>

                  {/* Tier Impact */}
                  <div className="bg-white dark:bg-snoonu-dark-darkGray border-2 border-snoonu-lightGray dark:border-snoonu-dark-lightGray rounded-xl p-6 transition-colors duration-300">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {result.score >= 80 ? '👑' : result.score >= 65 ? '🥈' : '🥉'}
                      </div>
                      <div className="text-xl font-bold text-snoonu-black dark:text-snoonu-dark-white mb-1">
                        {result.score >= 80 ? 'Gold Tier' : result.score >= 65 ? 'Silver Tier' : 'Bronze Tier'}
                      </div>
                      <div className="text-snoonu-gray dark:text-snoonu-dark-gray text-sm">
                        {result.score >= 80 ? 'Premium rewards unlocked!' :
                         result.score >= 65 ? 'Good progress!' : 'Keep improving!'}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-snoonu-red dark:bg-snoonu-dark-red hover:bg-snoonu-darkRed dark:hover:bg-snoonu-dark-darkRed text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                    🚀 Apply These Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}