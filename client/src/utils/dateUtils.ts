export const calculateDeadline = (frame: string): string => {
    const now = new Date();
    switch (frame) {
      case '1w':
        now.setDate(now.getDate() + 7);
        break;
      case '1m':
        now.setMonth(now.getMonth() + 1);
        break;
      case '3m':
        now.setMonth(now.getMonth() + 3);
        break;
      case '6m':
        now.setMonth(now.getMonth() + 6);
        break;
      case '1y':
        now.setFullYear(now.getFullYear() + 1);
        break;
      case '5y':
        now.setFullYear(now.getFullYear() + 5);
        break;
      case '10y':
        now.setFullYear(now.getFullYear() + 10);
        break;
    }
    return now.toISOString();
  };