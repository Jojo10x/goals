const TimeProgressBar: React.FC<{ deadline: string }> = ({ deadline }) => {
    const calculateTimeLeft = () => {
      const total = new Date(deadline).getTime() - new Date().getTime();
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      const months = Math.floor(days / 30);
      const years = Math.floor(months / 12);

      if (years > 0) return `${years} year${years > 1 ? "s" : ""}`;
      if (months > 0) return `${months} month${months > 1 ? "s" : ""}`;
      return `${days} day${days !== 1 ? "s" : ""}`;
    };

    const calculateProgress = () => {
      const total = new Date(deadline).getTime() - new Date().getTime();
      const elapsed =
        new Date().getTime() -
        new Date(new Date(deadline).getTime() - total).getTime();
      return Math.min(100, (elapsed / total) * 100);
    };
    return (
      <div className="mt-2">
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-full bg-blue-500 rounded-full"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Time left: {calculateTimeLeft()}
        </p>
      </div>
    );
  };

  export default TimeProgressBar