import React, { useState } from 'react';
import { Action } from '@/types';

interface ActionListProps {
  actions: Action[];
  onActionComplete: (actionId: string) => void;
  isLoading?: boolean;
}

export function ActionList({ actions, onActionComplete, isLoading = false }: ActionListProps) {
  const [completingAction, setCompletingAction] = useState<string | null>(null);

  const handleCompleteAction = async (actionId: string) => {
    setCompletingAction(actionId);
    try {
      await onActionComplete(actionId);
    } finally {
      setCompletingAction(null);
    }
  };

  if (actions.length === 0) {
    return (
      <div className="bg-white dark:bg-snoonu-dark-darkGray rounded-xl shadow-restaurant dark:shadow-restaurant-dark border border-snoonu-lightGray dark:border-snoonu-dark-lightGray p-8 text-center transition-colors duration-300">
        <div className="text-6xl mb-4">🎉</div>
        <div className="text-snoonu-black dark:text-snoonu-dark-white text-xl font-bold mb-2">All actions completed!</div>
        <div className="text-snoonu-gray dark:text-snoonu-dark-gray">Check back later for new recommendations.</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-snoonu-dark-darkGray rounded-xl shadow-restaurant dark:shadow-restaurant-dark border border-snoonu-lightGray dark:border-snoonu-dark-lightGray p-6 transition-colors duration-300">
      <div className="flex items-center mb-6">
        <div className="text-2xl mr-3">🚀</div>
        <div>
          <h3 className="text-xl font-bold text-snoonu-black dark:text-snoonu-dark-white">Autopilot Actions</h3>
          <p className="text-snoonu-gray dark:text-snoonu-dark-gray text-sm">One-click fixes to boost your score</p>
        </div>
      </div>

      <div className="space-y-4">
        {actions.map((action) => (
          <div
            key={action.id}
            className={`border-2 rounded-xl p-5 transition-all duration-200 ${
              action.status === 'completed'
                ? 'border-green-300 bg-green-50 dark:bg-green-900/20 shadow-md'
                : 'border-snoonu-lightGray dark:border-snoonu-dark-lightGray hover:border-snoonu-red dark:hover:border-snoonu-dark-red hover:shadow-lg'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-bold text-snoonu-black dark:text-snoonu-dark-white text-lg mb-2">{action.title}</h4>
                <p className="text-snoonu-gray dark:text-snoonu-dark-gray mb-3 leading-relaxed">{action.description}</p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center text-snoonu-gray dark:text-snoonu-dark-gray">
                    <span className="mr-2">⏱️</span>
                    <span className="font-medium">{action.effortMinutes} min</span>
                  </div>
                  <div className="flex items-center text-snoonu-red dark:text-snoonu-dark-red font-semibold">
                    <span className="mr-2">🎯</span>
                    <span>+{action.points} points</span>
                  </div>
                  <div className="flex items-center text-snoonu-black dark:text-snoonu-dark-white">
                    <span className="mr-2">📈</span>
                    <span className="font-medium">{action.impact}</span>
                  </div>
                </div>
              </div>
              <div className="ml-6">
                {action.status === 'completed' ? (
                  <div className="flex items-center text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
                    <span className="text-lg mr-2">✅</span>
                    <span className="font-semibold">Completed</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleCompleteAction(action.id)}
                    disabled={isLoading || completingAction === action.id}
                    className="bg-snoonu-red dark:bg-snoonu-dark-red hover:bg-snoonu-darkRed dark:hover:bg-snoonu-dark-darkRed text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {completingAction === action.id ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2">⏳</span>
                        Completing...
                      </span>
                    ) : (
                      'Fix It Now'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}