import React, { useState, useEffect } from "react";

interface TimeProgressBarProps {
  deadline: string;
  startTime: string;
}

const TimeProgressBar: React.FC<TimeProgressBarProps> = ({
  deadline: propDeadline,
  startTime: propStartTime,
}) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date().getTime();
      const deadlineTime = new Date(propDeadline).getTime();
      const startTime = new Date(propStartTime).getTime();

      console.log("Debug:", {
        now,
        deadlineTime,
        startTime,
        propDeadline,
        propStartTime,
      });

      if (isNaN(deadlineTime) || isNaN(startTime)) {
        setError(
          `Invalid date: deadline=${propDeadline}, startTime=${propStartTime}`
        );
        return;
      }

      const total = deadlineTime - now;
      const totalDuration = deadlineTime - startTime;

      if (totalDuration <= 0) {
        setError("Invalid duration: deadline is before or equal to start time");
        return;
      }

      if (total <= 0) {
        setTimeLeft("Time's up!");
        setProgress(100);
      } else {
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        let timeString = "";
        if (years > 0) {
          timeString = `${years}y ${months % 12}m `;
        } else if (months > 0) {
          timeString = `${months}m ${weeks % 4}w `;
        } else if (weeks > 0) {
          timeString = `${weeks}w ${days % 7}d `;
        } else if (days > 0) {
          timeString = `${days}d ${hours}h ${minutes}min ${seconds}s`;
        } else {
          timeString = `${hours}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        }

        setTimeLeft(timeString);

        const elapsedTime = now - startTime;
        const calculatedProgress = (elapsedTime / totalDuration) * 100;

        setProgress(Math.min(100, Math.max(0, calculatedProgress)));
      }
    };

    calculateProgress();
    const timer = setInterval(calculateProgress, 1000);

    return () => clearInterval(timer);
  }, [propDeadline, propStartTime]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-2">
      <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute h-full  transition-all duration-1000 ease-linear"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, #34D399, #059669)`,
            boxShadow: "0 4px 10px rgba(0, 128, 0, 0.2)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-white">
            {progress.toFixed(2)}%
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1 text-center">Time left: {timeLeft}</p>
    </div>
  );
};

export default TimeProgressBar;
