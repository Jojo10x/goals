import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import TimeFrameSelector from "./TimeFrameSelector";

interface AddGoalFormProps {
  onAddGoal: (description: string, timeFrame: string) => Promise<boolean>;
  showSnackbar: (message: string, severity: "success" | "error") => void;
}

const AddGoalForm: React.FC<AddGoalFormProps> = ({
  onAddGoal,
  showSnackbar,
}) => {
  const [newGoal, setNewGoal] = useState("");
  const [timeFrame, setTimeFrame] = useState("1w");
  const [showModal, setShowModal] = useState(false);

  const handleAddGoal = async () => {
    if (!newGoal.trim()) return;
    const success = await onAddGoal(newGoal, timeFrame);
    if (success) {
      setNewGoal("");
      setTimeFrame("1w");
      setShowModal(false);
      showSnackbar("Successful! Goal added.", "success");
    } else {
      showSnackbar("Failed to add goal. Please try again.", "error");
    }
  };

  return (
    <div className="space-y-4">
      <button
        className="relative px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full hover:from-purple-600 hover:to-indigo-500 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center justify-center transform hover:scale-105"
        onClick={() => setShowModal(true)}
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Goal
        <span className="absolute inset-0 rounded-full bg-indigo-500 opacity-0 hover:opacity-30 transition-opacity duration-300"></span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Add a New Goal
            </h2>
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Enter your new goal"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
              <TimeFrameSelector onChange={setTimeFrame} />
              <button
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
                onClick={handleAddGoal}
              >
                <Plus className="w-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddGoalForm;