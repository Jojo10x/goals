import React from 'react';
import { Goal } from '../types/types';

interface GoalProgressProps {
  goals: Goal[];
}

const GoalProgress: React.FC<GoalProgressProps> = ({ goals }) => {
  const completedGoalsCount = goals.filter((goal) => goal.completed).length;
  const progress = goals.length > 0 ? (completedGoalsCount / goals.length) * 100 : 0;

  return (
    <>
      <p className="text-gray-600 mb-2">
       {completedGoalsCount} / {goals.length} goals completed
      </p>
      <div className="relative h-2 bg-gray-200 rounded-full mb-4">
        <div
          className="absolute h-full bg-green-700 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
};

export default GoalProgress;