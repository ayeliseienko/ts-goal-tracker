import { Timestamp } from 'firebase/firestore';

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

export default interface GoalInterface {
  id: string;
  title: string;
  creationDate: Timestamp;
  deadline: Timestamp;
  completed: boolean;
  milestones: Milestone[];
}
