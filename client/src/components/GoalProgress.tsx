import React from "react";
import { Goal } from "../types/types";

interface GoalProgressProps {
  goals: Goal[];
}

const GoalProgress: React.FC<GoalProgressProps> = ({ goals }) => {
  const completedGoalsCount = goals.filter((goal) => goal.completed).length;
  const progress =
    goals.length > 0 ? (completedGoalsCount / goals.length) * 100 : 0;

  const getProgressText = () => {
    if (progress === 100) return "All goals completed! 🎉";
    if (progress >= 75) return "You're almost there! Keep going! 💪";
    if (progress >= 50) return "Great progress! Halfway done! 🔥";
    if (progress > 0) return "Just getting started, keep pushing! 🚀";
    return "No goals completed yet, time to take action! ⏳";
  };

  return (
    <>
      <div className="relative w-full h-8 bg-gray-300 rounded-full  flex items-center justify-center text-white font-semibold">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-500 ease-in-out"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, #34D399, #059669)`,
            boxShadow: "0 4px 10px rgba(0, 128, 0, 0.2)",
          }}
        />

        <span className="relative z-10">
          {completedGoalsCount} / {goals.length}
        </span>
      </div>
      <p className="text-gray-700 text-sm font-semibold">{getProgressText()}</p>
    </>
  );
};

export default GoalProgress;
