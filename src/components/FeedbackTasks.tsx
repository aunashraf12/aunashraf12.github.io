import React, { useState } from 'react';

interface FeedbackItem {
  id: string;
  text: string;
  rating: number;
  category: 'late' | 'missing' | 'spilled' | 'wrong' | 'cold' | 'other';
  severity: 'low' | 'medium' | 'high';
  date: string;
}

interface FeedbackTasksProps {
  onGenerateTask: (category: string, feedback: FeedbackItem) => void;
}

const mockFeedback: FeedbackItem[] = [
  {
    id: '1',
    text: 'Order was 45 minutes late, food arrived cold',
    rating: 2,
    category: 'late',
    severity: 'high',
    date: '2024-01-15'
  },
  {
    id: '2',
    text: 'Missing fries from my burger combo',
    rating: 3,
    category: 'missing',
    severity: 'medium',
    date: '2024-01-14'
  },
  {
    id: '3',
    text: 'Burger sauce was spilled all over the bag',
    rating: 1,
    category: 'spilled',
    severity: 'high',
    date: '2024-01-13'
  },
  {
    id: '4',
    text: 'Ordered a cheeseburger but got plain burger',
    rating: 2,
    category: 'wrong',
    severity: 'medium',
    date: '2024-01-12'
  },
  {
    id: '5',
    text: 'Pizza arrived cold and cheese was hard',
    rating: 2,
    category: 'cold',
    severity: 'medium',
    date: '2024-01-11'
  }
];

const taskTemplates = {
  late: {
    title: '🚨 Speed up order preparation',
    description: 'Multiple customers complaining about late deliveries. Review and optimize prep times.',
    impact: 'Reduce late orders by 25%',
    effort: 15,
    points: 8
  },
  missing: {
    title: '📦 Improve order accuracy checklist',
    description: 'Items missing from orders. Implement double-check system before dispatch.',
    impact: 'Reduce missing items by 30%',
    effort: 10,
    points: 6
  },
  spilled: {
    title: '🥤 Upgrade packaging standards',
    description: 'Food arriving damaged/spilled. Review packaging materials and techniques.',
    impact: 'Reduce packaging complaints by 40%',
    effort: 20,
    points: 7
  },
  wrong: {
    title: '✅ Enhance order verification',
    description: 'Wrong items delivered. Add final verification step before packaging.',
    impact: 'Improve order accuracy to 98%',
    effort: 12,
    points: 5
  },
  cold: {
    title: '🔥 Improve food temperature control',
    description: 'Food arriving cold. Review insulation and delivery timing.',
    impact: 'Increase hot food delivery rate by 35%',
    effort: 18,
    points: 9
  }
};

export function FeedbackTasks({ onGenerateTask }: FeedbackTasksProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([]);

  const getCategoryColor = (category: string) => {
    const colors = {
      late: 'bg-red-100 text-red-800 border-red-200',
      missing: 'bg-orange-100 text-orange-800 border-orange-200',
      spilled: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      wrong: 'bg-purple-100 text-purple-800 border-purple-200',
      cold: 'bg-blue-100 text-blue-800 border-blue-200',
      other: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const handleGenerateTask = (feedback: FeedbackItem) => {
    const template = taskTemplates[feedback.category];
    if (template && !generatedTasks.includes(feedback.category)) {
      onGenerateTask(feedback.category, feedback);
      setGeneratedTasks(prev => [...prev, feedback.category]);
    }
  };

  // Group feedback by category
  const groupedFeedback = mockFeedback.reduce((acc, feedback) => {
    if (!acc[feedback.category]) {
      acc[feedback.category] = [];
    }
    acc[feedback.category].push(feedback);
    return acc;
  }, {} as Record<string, FeedbackItem[]>);

  return (
    <div className="bg-white dark:bg-snoonu-dark-darkGray rounded-xl shadow-restaurant dark:shadow-restaurant-dark border border-snoonu-lightGray dark:border-snoonu-dark-lightGray p-6 transition-colors duration-300">
      <div className="flex items-center mb-6">
        <div className="text-2xl mr-3">💬</div>
        <div>
          <h3 className="text-xl font-bold text-snoonu-black dark:text-snoonu-dark-white">Customer Feedback</h3>
          <p className="text-snoonu-gray dark:text-snoonu-dark-gray text-sm">Recent reviews converted to actionable tasks</p>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedFeedback).map(([category, feedbacks]) => {
          const taskTemplate = taskTemplates[category as keyof typeof taskTemplates];
          const hasTask = generatedTasks.includes(category);

          return (
            <div key={category} className="border-2 border-snoonu-lightGray rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getSeverityIcon(feedbacks[0].severity)}</span>
                  <h4 className="font-bold text-snoonu-black capitalize">
                    {category} Issues ({feedbacks.length})
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                    {category}
                  </span>
                </div>
                {!hasTask && taskTemplate && (
                  <button
                    onClick={() => handleGenerateTask(feedbacks[0])}
                    className="bg-snoonu-red hover:bg-snoonu-darkRed text-white px-4 py-2 rounded-lg font-bold text-sm shadow hover:shadow-md transition-all duration-200"
                  >
                    Create Task
                  </button>
                )}
                {hasTask && (
                  <span className="text-green-600 font-semibold flex items-center">
                    <span className="mr-2">✅</span>
                    Task Created
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-3">
                {feedbacks.slice(0, 2).map((feedback) => (
                  <div key={feedback.id} className="bg-snoonu-lightRed rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-snoonu-black text-sm flex-1 mr-3">"{feedback.text}"</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500">{'⭐'.repeat(feedback.rating)}</span>
                        <span className="text-snoonu-gray text-xs">{feedback.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {feedbacks.length > 2 && (
                  <p className="text-snoonu-gray text-xs text-center">
                    +{feedbacks.length - 2} more {category} complaints
                  </p>
                )}
              </div>

              {taskTemplate && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h5 className="font-bold text-blue-900 text-sm mb-1">Suggested Task:</h5>
                  <p className="text-blue-800 text-sm">{taskTemplate.title}</p>
                  <p className="text-blue-700 text-xs mt-1">{taskTemplate.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-blue-600">
                    <span>⏱️ {taskTemplate.effort} min</span>
                    <span>🎯 +{taskTemplate.points} points</span>
                    <span>📈 {taskTemplate.impact}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-snoonu-lightRed rounded-lg border border-snoonu-red/20">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-snoonu-red">💡</span>
          <h4 className="font-bold text-snoonu-black">How it works</h4>
        </div>
        <p className="text-snoonu-gray text-sm">
          Customer feedback is automatically analyzed and grouped by issue type.
          Click "Create Task" to add actionable improvements to your dashboard.
        </p>
      </div>
    </div>
  );
}