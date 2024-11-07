import React from "react";
import TimeProgressBar from "./TimeProgressBar";
import "../module.css";

interface Goal {
  createdAt: string;
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
      className={`flex flex-col p-4 rounded-lg shadow-md transition-colors h-full lg:w-72 ${
        !goal.completed ? "bg-white hover:bg-gray-50" : ""
      }`}
      style={{
        background: goal.completed
          ? "linear-gradient(90deg, #34D399, #059669)"
          : "",
      }}
    >
      <h1
        className={`text-3xl mb-2 flex-grow break-words ${
          goal.completed ? "line-through text-gray-500" : "text-gray-700"
        }`}
      >
        {goal.description}
      </h1>

      <div className="mt-auto mb-4">
        <TimeProgressBar deadline={goal.deadline} startTime={goal.createdAt} />
      </div>
      <div className="flex justify-between items-center mb-2">
        <div className="relative group">
          <button
            onClick={() => onToggleCompletion(goal)}
            className="p-1 text-2xl -m-1"
          >
            {goal.completed ? (
              <span className="text-yellow-500 hover:text-green-600 transform hover:scale-110 transition duration-200">
                ↩️
              </span>
            ) : (
              <span className="text-gray-400 hover:text-green-600 transform hover:scale-110 transition duration-200">
                ✅
              </span>
            )}
          </button>
          <span className="absolute bottom-full mb-1 w-max text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {goal.completed ? "Mark as incomplete" : "Mark as complete"}
          </span>
        </div>
        <span
          className={`inline-block text-xs py-1 px-2 rounded-full  ${
            goal.completed ? "bg-white text-green-700" : "text-gray-700 bg-gray-200"
          }`}
        >
          {goal.completed ? (
            <span className="completed-animation">Completed</span>
          ) : (
            <span className="progress-dots">In Progress</span>
          )}
        </span>

        <div className="flex space-x-1">
          <div className="relative group">
            <button
              onClick={() => onEdit(goal)}
              className="p-1 text-2xl text-gray-500 hover:text-indigo-600 transform hover:scale-110 transition duration-200"
            >
              ✏️
            </button>
            <span className="absolute bottom-full mb-1 w-max text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Edit
            </span>
          </div>

          <div className="relative group">
            <button
              onClick={() => onDelete(goal.id)}
              className="p-1 text-2xl text-gray-500 hover:text-red-600 transform hover:scale-110 transition duration-200"
            >
              🗑️
            </button>
            <span className="absolute bottom-full mb-1 w-max text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Delete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalItem;
