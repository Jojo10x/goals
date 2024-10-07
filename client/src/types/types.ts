export interface Goal {
    [x: string]: ReactNode;
    id: number;
    description: string;
    completed: boolean;
    deadline: string;   
  }
  