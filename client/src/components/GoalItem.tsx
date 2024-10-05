import React from "react";
import { Edit, Trash2, Trophy } from "lucide-react";
import TimeProgressBar from "./TimeProgressBar";
import "../module.css";

interface Goal {
  id: number;
  description: string;
  completed: boolean;
  deadline: string;
}

interface GoalItemProps {
  goal: Goal;
  onToggleCompletion: (goal: Goal) => void;
  onDelete: (id: number) => void;
  onEdit: (goal: Goal) => void;
}

const GoalItem: React.FC<GoalItemProps> = ({
  goal,
  onToggleCompletion,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      className={`flex flex-col p-4 rounded-lg shadow-md transition-colors bg-white  h-full lg:w-72 ${
        goal.completed ? "bg-green-100" : "hover:bg-gray-50"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <button
          onClick={() => onToggleCompletion(goal)}
          className="p-1 -m-1"
          aria-label={
            goal.completed ? "Mark as incomplete" : "Mark as complete"
          }
        >
          <Trophy
            className={`h-6 w-6 ${
              goal.completed ? "text-yellow-500" : "text-gray-400"
            }`}
          />
        </button>
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(goal)}
            className="p-1 text-gray-500 hover:text-indigo-600 transition-colors duration-200"
            aria-label="Edit goal"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            className="p-1 text-gray-500 hover:text-red-600 transition-colors duration-200"
            aria-label="Delete goal"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p
        className={`text-sm mb-2 flex-grow ${
          goal.completed ? "line-through text-gray-500" : "text-gray-700"
        }`}
      >
        {goal.description}
      </p>
      <div className="mt-auto">
        <span
          className={`inline-block text-xs py-1 px-2 rounded-full mb-2 ${
            goal.completed
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {goal.completed ? (
            <span className="completed-animation">Completed</span>
          ) : (
            <span className="progress-dots">In Progress</span>
          )}
        </span>
        <TimeProgressBar deadline={goal.deadline} />
      </div>
    </div>
  );
};

export default GoalItem;
