import React, { useState } from "react";
import { useGoals } from "../hooks/useGoals";
import { useSnackbar } from "../hooks/useSnackbar";
import { Goal } from "../types/types";
import AddGoalForm from "./AddGoalForm";
import EditGoalDialog from "./EditGoalDialog";
import SnackbarMessage from "./SnackbarMessage";
import GoalList from "./GoalList";
import GoalProgress from "./GoalProgress";
import GoalFilters, { FilterType } from "./GoalFilters";
import { calculateDeadline } from "../utils/dateUtils";

const GoalsList: React.FC = () => {
  const {
    goals,
    addGoal,
    deleteGoal,
    toggleGoalCompletion,
    editGoal,
    isLoading,
  } = useGoals();

  const { snackbar, showSnackbar } = useSnackbar();

  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [timeFrame, setTimeFrame] = useState("1w");

  const handleEditGoal = (updatedGoal: Goal) => {
    editGoal(updatedGoal);
    setEditingGoal(null);
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  const filteredGoals = goals.filter((goal) => {
    switch (activeFilter) {
      case "current":
        return !goal.completed;
      case "completed":
        return goal.completed;
      case "byDate": {
        const deadlineDate = new Date(calculateDeadline(timeFrame));
        const goalDate = new Date(goal.deadline);
        return goalDate <= deadlineDate;
      }
      case "all":
      default:
        return true;
    }
  });

  return (
    <div className="container mx-auto  py-8 max-w-7xl">
      <div className=" shadow-lg rounded-2xl flex flex-row items-center justify-center flex-wrap md:flex-nowrap md:flex-row">
        <div className="p-4">
          <GoalProgress goals={goals} />
        </div>
        <div className="p-4">
          <GoalFilters
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            timeFrame={timeFrame}
            onTimeFrameChange={setTimeFrame}
          />
        </div>
        <div className="p-4">
          <AddGoalForm onAddGoal={addGoal} showSnackbar={showSnackbar} />
        </div>
      </div>

      <div className=" shadow-lg rounded-2xl p-6">
        {isLoading ? (
          <div className="animate-pulse h-2 bg-indigo-300 rounded-full" />
        ) : (
          <GoalList
            goals={filteredGoals}
            onToggleCompletion={toggleGoalCompletion}
            onDelete={deleteGoal}
            onEdit={setEditingGoal}
          />
        )}
      </div>

      <SnackbarMessage {...snackbar} />

      <EditGoalDialog
        goal={editingGoal}
        onSave={handleEditGoal}
        onClose={() => setEditingGoal(null)}
      />
    </div>
  );
};

export default GoalsList;
