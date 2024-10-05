import React from 'react';
import { Goal } from '../types/types';

interface EditGoalDialogProps {
  goal: Goal | null;
  onSave: (updatedGoal: Goal) => void;
  onClose: () => void;
}

const EditGoalDialog: React.FC<EditGoalDialogProps> = ({ goal, onSave, onClose }) => {
  const [editedDescription, setEditedDescription] = React.useState(goal?.description || '');

  if (!goal) return null;

  const handleSave = () => {
    onSave({ ...goal, description: editedDescription });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold mb-2">Edit Goal</h2>
        <input
          type="text"
          className="border rounded-lg p-2 w-full"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black rounded-lg px-4 py-2 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGoalDialog;