export const calculateDeadline = (frame: string): string => {
  const now = new Date();
  const amount = parseInt(frame.slice(0, -1)); 
  const unit = frame.slice(-1); 

  switch (unit) {
    case 'd':
      now.setDate(now.getDate() + amount);
      break;
    case 'w':
      now.setDate(now.getDate() + amount * 7);
      break;
    case 'm':
      now.setMonth(now.getMonth() + amount);
      break;
    case 'y':
      now.setFullYear(now.getFullYear() + amount);
      break;
    default:
      throw new Error(`Invalid unit: ${unit}`);
  }

  return now.toISOString();
};
