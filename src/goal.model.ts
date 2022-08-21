export default interface GoalInterface {
  id: string;
  title: string;
  creationDate: Date;
  deadline: Date;
  completed: boolean;
  milestones: { id: string; title: string; completed: boolean }[];
}
