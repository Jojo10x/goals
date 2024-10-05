import React from 'react';
import GoalItem from './GoalItem';
import { Goal } from '../types/types';

interface GoalListProps {
  goals: Goal[];
  onToggleCompletion: (goal: Goal) => void;
  onDelete: (id: number) => void;
  onEdit: (goal: Goal) => void;
}

const GoalList: React.FC<GoalListProps> = ({
  goals,
  onToggleCompletion,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="container mx-auto ">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onToggleCompletion={onToggleCompletion}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  </div>
  );
};

export default GoalList;