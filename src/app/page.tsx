'use client';

import React, { useState, useEffect } from 'react';
import { ScoreCard } from '@/components/ScoreCard';
import { ActionList } from '@/components/ActionList';
import { DiscountCalculator } from '@/components/DiscountCalculator';
import { RewardsPanel } from '@/components/RewardsPanel';
import { WhatIfSimulator } from '@/components/WhatIfSimulator';
import { FeedbackTasks } from '@/components/FeedbackTasks';
import { CampaignBuilder } from '@/components/CampaignBuilder';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DashboardData, DiscountScenario } from '@/types';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [calculatorResult, setCalculatorResult] = useState<any>(null);
  const [calculatorLoading, setCalculatorLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'feedback' | 'campaign' | 'calculator'>('dashboard');
  const [showSimulator, setShowSimulator] = useState(false);

  // Use demo merchant ID 1 (Burger House)
  const merchantId = '1';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      console.log('Fetching dashboard data...');
      const response = await fetch(`/api/merchant/${merchantId}/dashboard`);
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Dashboard data received:', data);
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // For demo purposes, load mock data if API fails
      console.log('Loading mock data instead...');
      const { demoMerchants, demoMetrics, demoActions } = await import('@/lib/demo-data');
      const { calculateScore } = await import('@/lib/scoring');
      const { generateRecommendations } = await import('@/lib/recommendations');

      const merchant = demoMerchants.find(m => m.id === merchantId);
      const metrics = demoMetrics[merchantId];

      if (merchant && metrics) {
        const scoreBreakdown = calculateScore(metrics);
        scoreBreakdown.improvementActions = generateRecommendations(metrics, merchant.vertical);

        const nextActions = demoActions[merchantId] || [];

        setDashboardData({
          merchant: { ...merchant, score: scoreBreakdown.overall },
          scoreBreakdown,
          nextActions,
          recentActivity: nextActions.filter(a => a.status === 'completed').slice(0, 3)
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleActionComplete = async (actionId: string) => {
    setActionLoading(true);
    try {
      const response = await fetch(`/api/merchant/${merchantId}/actions/${actionId}/complete`, {
        method: 'POST'
      });
      const result = await response.json();

      if (result.success) {
        // Refresh dashboard data to show updated score
        await fetchDashboardData();

        // Show success notification
        alert(`🍔 Action completed! +${result.pointsGained} points. New score: ${result.newScore}\n\nKeep it up - you're moving up the tiers!`);
      }
    } catch (error) {
      console.error('Failed to complete action:', error);
      alert('Failed to complete action. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDiscountCalculate = async (scenario: any) => {
    setCalculatorLoading(true);
    try {
      const response = await fetch('/api/discount/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scenario),
      });
      const result = await response.json();
      setCalculatorResult(result);
    } catch (error) {
      console.error('Failed to calculate discount:', error);
    } finally {
      setCalculatorLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-snoonu-white dark:bg-snoonu-dark-black flex items-center justify-center transition-colors duration-300" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(229, 62, 62, 0.03) 0%, transparent 70%)'
      }}>
        <div className="text-center">
          <div className="bg-snoonu-red dark:bg-snoonu-dark-red rounded-full p-6 mb-6 shadow-lg animate-pulse">
            <div className="text-4xl text-white animate-bounce">🍔</div>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-snoonu-red dark:border-snoonu-dark-red border-t-transparent mx-auto mb-4"></div>
          <p className="text-snoonu-black dark:text-snoonu-dark-white font-bold text-lg">Loading Your Restaurant Dashboard...</p>
          <p className="text-snoonu-gray dark:text-snoonu-dark-gray text-sm mt-2">Preparing your personalized insights</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-snoonu-white dark:bg-snoonu-dark-black flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <p className="text-snoonu-red dark:text-snoonu-dark-red font-bold text-xl">Failed to load dashboard data</p>
          <p className="text-snoonu-gray dark:text-snoonu-dark-gray text-sm mt-2">Please refresh the page or contact support</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-snoonu-white dark:bg-snoonu-dark-black transition-colors duration-300" style={{
      backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(229, 62, 62, 0.02) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(229, 62, 62, 0.02) 0%, transparent 50%)'
    }}>
      {/* Header */}
      <header className="bg-white dark:bg-snoonu-dark-black shadow-restaurant dark:shadow-restaurant-dark border-b-2 border-snoonu-lightGray dark:border-snoonu-dark-lightGray transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-snoonu-red dark:bg-snoonu-dark-red text-white px-4 py-2 rounded-xl font-black text-xl shadow-lg">
                SNOONU
              </div>
              <div className="text-snoonu-gray dark:text-snoonu-dark-gray font-bold text-lg">MerchantOS</div>
              <div className="bg-snoonu-lightRed dark:bg-snoonu-dark-lightRed text-snoonu-red dark:text-snoonu-dark-red px-3 py-1 rounded-full text-xs font-bold">
                RESTAURANT EDITION
              </div>
            </div>
            <div className="flex items-center space-4">
              <ThemeToggle />
              <nav className="flex space-x-2 ml-4">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    activeTab === 'dashboard'
                      ? 'bg-snoonu-red dark:bg-snoonu-dark-red text-white shadow-lg transform scale-105'
                      : 'text-snoonu-gray dark:text-snoonu-dark-gray hover:text-snoonu-black dark:hover:text-snoonu-dark-white hover:bg-snoonu-lightGray dark:hover:bg-snoonu-dark-lightGray'
                  }`}
                >
                  🏠 Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('feedback')}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    activeTab === 'feedback'
                      ? 'bg-snoonu-red dark:bg-snoonu-dark-red text-white shadow-lg transform scale-105'
                      : 'text-snoonu-gray dark:text-snoonu-dark-gray hover:text-snoonu-black dark:hover:text-snoonu-dark-white hover:bg-snoonu-lightGray dark:hover:bg-snoonu-dark-lightGray'
                  }`}
                >
                  💬 Feedback
                </button>
                <button
                  onClick={() => setActiveTab('campaign')}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    activeTab === 'campaign'
                      ? 'bg-snoonu-red dark:bg-snoonu-dark-red text-white shadow-lg transform scale-105'
                      : 'text-snoonu-gray dark:text-snoonu-dark-gray hover:text-snoonu-black dark:hover:text-snoonu-dark-white hover:bg-snoonu-lightGray dark:hover:bg-snoonu-dark-lightGray'
                  }`}
                >
                  🎯 Campaign
                </button>
                <button
                  onClick={() => setActiveTab('calculator')}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    activeTab === 'calculator'
                      ? 'bg-snoonu-red dark:bg-snoonu-dark-red text-white shadow-lg transform scale-105'
                      : 'text-snoonu-gray dark:text-snoonu-dark-gray hover:text-snoonu-black dark:hover:text-snoonu-dark-white hover:bg-snoonu-lightGray dark:hover:bg-snoonu-dark-lightGray'
                  }`}
                >
                  💰 Calculator
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <ScoreCard
                merchant={dashboardData.merchant}
                scoreBreakdown={dashboardData.scoreBreakdown}
                onOpenSimulator={() => setShowSimulator(true)}
              />

              <ActionList
                actions={dashboardData.nextActions}
                onActionComplete={handleActionComplete}
                isLoading={actionLoading}
              />

              {/* Issues Section */}
              <div className="bg-white dark:bg-snoonu-dark-darkGray rounded-xl shadow-restaurant dark:shadow-restaurant-dark border border-snoonu-lightGray dark:border-snoonu-dark-lightGray p-6 transition-colors duration-300">
                <div className="flex items-center mb-6">
                  <div className="text-2xl mr-3">⚠️</div>
                  <div>
                    <h3 className="text-xl font-bold text-snoonu-black dark:text-snoonu-dark-white">Top Issues</h3>
                    <p className="text-snoonu-gray dark:text-snoonu-dark-gray text-sm">Areas needing immediate attention</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {dashboardData.scoreBreakdown.topIssues.map((issue, index) => (
                    <li key={index} className="flex items-start space-x-3 bg-snoonu-lightRed dark:bg-snoonu-dark-lightRed rounded-lg p-4">
                      <span className="text-snoonu-red dark:text-snoonu-dark-red mt-1 text-lg">•</span>
                      <span className="text-snoonu-black dark:text-snoonu-dark-white font-medium">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <RewardsPanel merchant={dashboardData.merchant} />
            </div>
          </div>
        ) : activeTab === 'feedback' ? (
          <FeedbackTasks
            onGenerateTask={(category, feedback) => {
              alert(`Task created for ${category} issues!\n"${feedback.text}"\n\nThis will be added to your action list.`);
            }}
          />
        ) : activeTab === 'campaign' ? (
          <CampaignBuilder
            onCreateCampaign={(campaign) => {
              alert(`🎉 Campaign "${campaign.title}" has been launched!\n\nExpected impact: +25% orders during campaign period`);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DiscountCalculator
              onCalculate={handleDiscountCalculate}
              isLoading={calculatorLoading}
            />

            {calculatorResult && (
              <div className="bg-white dark:bg-snoonu-dark-darkGray rounded-xl shadow-restaurant dark:shadow-restaurant-dark border border-snoonu-lightGray dark:border-snoonu-dark-lightGray p-6 transition-colors duration-300">
                <div className="flex items-center mb-6">
                  <div className="text-2xl mr-3">📊</div>
                  <div>
                    <h3 className="text-xl font-bold text-snoonu-black dark:text-snoonu-dark-white">Profit Analysis Results</h3>
                    <p className="text-snoonu-gray dark:text-snoonu-dark-gray text-sm">Smart pricing recommendations</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-snoonu-lightRed dark:bg-snoonu-dark-lightRed rounded-xl border border-snoonu-red/20 dark:border-snoonu-dark-red/20">
                      <div className="text-3xl font-black text-snoonu-red dark:text-snoonu-dark-red mb-1">
                        ${calculatorResult.scenario.profitBefore.toFixed(2)}
                      </div>
                      <div className="text-snoonu-gray dark:text-snoonu-dark-gray font-medium">Profit Before Discount</div>
                    </div>
                    <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                      <div className="text-3xl font-black text-green-600 dark:text-green-400 mb-1">
                        ${calculatorResult.scenario.profitAfter.toFixed(2)}
                      </div>
                      <div className="text-snoonu-gray dark:text-snoonu-dark-gray font-medium">Profit After Discount</div>
                    </div>
                  </div>

                  <div className="border-t border-snoonu-lightGray dark:border-snoonu-dark-lightGray pt-6 mt-6">
                    <div className="text-snoonu-gray dark:text-snoonu-dark-gray font-medium mb-3">📈 Break-even Analysis:</div>
                    <div className="text-2xl font-bold text-snoonu-black dark:text-snoonu-dark-white">
                      {calculatorResult.scenario.breakEvenUplift}% more orders needed
                    </div>
                    <div className="text-snoonu-gray dark:text-snoonu-dark-gray text-sm mt-1">to maintain current profit levels</div>
                  </div>

                  <div className="border-t border-snoonu-lightGray dark:border-snoonu-dark-lightGray pt-6 mt-6">
                    <div className="bg-snoonu-lightRed dark:bg-snoonu-dark-lightRed rounded-xl p-4 border border-snoonu-red/20 dark:border-snoonu-dark-red/20">
                      <div className="text-lg font-bold text-snoonu-black dark:text-snoonu-dark-white mb-2">
                        💡 Smart Recommendation
                      </div>
                      <div className="text-snoonu-red dark:text-snoonu-dark-red font-bold text-xl">
                        {calculatorResult.recommendation === 'profit-maximizing' ? '🎯 Profit-Maximizing Strategy' : '📈 Volume-Maximizing Strategy'}
                      </div>
                      <div className="text-snoonu-gray dark:text-snoonu-dark-gray text-sm mt-1">
                        {calculatorResult.recommendation === 'profit-maximizing'
                          ? 'Focus on higher margins - quality over quantity'
                          : 'Drive more sales volume - quantity drives profits'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* What-If Simulator Modal */}
        {showSimulator && dashboardData && (
          <WhatIfSimulator
            currentMetrics={(() => {
              // Get current metrics from demo data
              const { demoMetrics } = require('@/lib/demo-data');
              return demoMetrics['1']; // Burger House metrics
            })()}
            onClose={() => setShowSimulator(false)}
          />
        )}
      </main>
    </div>
  );
}